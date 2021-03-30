/** @format */

require('date-format-lite'); // add date format

class Storage {
	constructor(connection) {
		this._db = connection;
	}

	// create a new event
	async insert(data, owner_id) {
		let sql =
			'INSERT INTO events (start_date,end_date,text,event_pid,event_length,rec_type,owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';

		const result = await this._db.query(sql, [
			data.start_date,
			data.end_date,
			data.text,
			data.event_pid || 0, //!
			data.event_length || 0, //!
			data.rec_type, //!
			owner_id,
		]);

		// delete a single occurrence from a recurring series
		let action = 'inserted';
		if (data.rec_type == 'none') {
			action = 'deleted';
		}
		return {
			action: action,
			tid: result.rows[0].id,
		};
	}

	// update an event
	async update(id, data) {
		await this._db.query(
			'UPDATE events SET start_date = $1, end_date= $2, text = $3,event_pid= $4, event_length= $5, rec_type= $6 WHERE id = $7',
			[
				data.start_date,
				data.end_date,
				data.text,
				data.event_pid || 0,
				data.event_length || 0,
				data.rec_type,
				id,
			],
		);

		return {
			action: 'updated',
		};
	}

	// delete an event
	async delete(id) {
		// some logic specific to the recurring events support
		// https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
		let event = await this._db.query(
			'SELECT * FROM events WHERE id=$1 LIMIT 1;',
			[id],
		);

		if (event.event_pid) {
			// deleting modified occurrence from a recurring series
			// If an event with the event_pid value was deleted,
			// it should be updated with "rec_type==none" instead of deleting.
			event.rec_type = 'none';
			return await this.update(id, event);
		}

		if (event.rec_type && event.rec_type != 'none') {
			// if a recurring series deleted, delete all modified occurrences of the series
			await this._db.query('DELETE FROM events WHERE event_pid=$1 ;', [
				id,
			]);
		}

		await this._db.query('DELETE FROM events WHERE id= $1;', [id]);

		return {
			action: 'deleted',
		};
	}
	async getAll(params,owner_id) {
		let query = 'SELECT * FROM events WHERE owner_id= $1';
		let queryParams = [owner_id];

		if (params.from && params.to) {
			query += 'AND end_date >= $2 AND start_date < $3';
			queryParams.push(params.from);
			queryParams.push(params.to);
		}

		let result = await this._db.query(query, queryParams);
		//    console.log(result)
		result.rows.forEach((entry) => {
			// format date and time
			entry.start_date = entry.start_date.format('YYYY-MM-DD hh:mm');
			entry.end_date = entry.end_date.format('YYYY-MM-DD hh:mm');
		});
		return result.rows;
	}

}

module.exports = Storage;
