/** @format */

$('#form').on('submit', handleFormSubmit);

let typingTimeout = null;
let isStartTypeSent = false;
let typingUsers = new Set();

function handleFormSubmit(e) {
	e.preventDefault();
	const form = $(this);
	const formData = new FormData(form[0]);
	for (const p of formData) {
		if (p[1].size <= 0) {
			return;
		}
	}
	$.ajax({
		method: 'POST',
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		url: '/upload',
		success: handleUploadSuccess,
		xhr: handleUploadProgress,
	});
}

function handleUploadSuccess(resp) {
	socket.emit('file', {
		name,
		file: {
			url: `${resp.newFilename}`,
			filename: resp.originalFilename,
			messagewriter: logedInUser.innerText,
		},
	});
	$('#form')[0].reset();
	$('#upload-progress').text('');
}

function handleUploadProgress() {
	const xhr = new window.XMLHttpRequest();
	xhr.upload.addEventListener(
		'progress',
		(e) => {
			const percent = (event.loaded / event.total) * 100;
			const progress = Math.round(percent);
			$('#upload-progress').text(`${progress}% uploaded`);
		},
		false,
	);
	xhr.addEventListener(
		'error',
		(e) => {
			$('#upload-progress').text('Upload errored!');
			console.error(e);
		},
		false,
	);
	xhr.addEventListener(
		'abort',
		(e) => {
			$('#upload-progress').text('Upload aborted');
			console.error(e);
		},
		false,
	);

	return xhr;
}

function handleStartType(name) {
	typingUsers.add(name);
	let displayString = '';
	for (const user of Array.from(typingUsers)) {
		displayString += `${user}, `;
	}
	displayString = displayString.substr(0, displayString.length - 2);
	displayString += ' typing...';
	$('#indicator').text(displayString);
}

function handleFile(f) {
	console.log(f);
	$('#chat').append(`
            <li class = "message"><b>${f.file.messagewriter} :<a target='_blank' href='/uploads/${f.file.url}'
            download='${f.file.filename}'>${f.file.filename}</a>
            </li>
        `);
}
