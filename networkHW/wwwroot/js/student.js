﻿const uriStudent = 'api/students';
let students = [];

function getStudents() {
    fetch(uriStudent)
        .then(response => response.json())
        .then(data => _displayStudents(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addStudent() {
    const addNameTextbox = document.getElementById('add-sname');

    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim()
    };

    fetch(uriStudent, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getStudents();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteStudent(id) {
    fetch(`${uriStudent}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getStudents())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditSForm(id) {
    const item = students.find(item => item.id === id);

    document.getElementById('edit-sname').value = item.name;
    document.getElementById('edit-sid').value = item.id;
    document.getElementById('editSForm').style.display = 'block';
}

function updateStudent() {
    const itemId = document.getElementById('edit-sid').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-sname').value.trim()
    };

    fetch(`${uriStudent}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getStudents())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeStudent() {
    document.getElementById('editSForm').style.display = 'none';
}

function _displaySCount(itemCount) {
    const name = (itemCount === 1) ? 'student' : 'students';

    document.getElementById('scounter').innerText = `${itemCount} ${name}`;
}

function _displayStudents(data) {
    const tBody = document.getElementById('students');
    tBody.innerHTML = '';

    _displaySCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditSForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteStudent(${item.id})`);

        let tr = tBody.insertRow();

        let td2 = tr.insertCell(0);

        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(1);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(2);
        td4.appendChild(deleteButton);
    });

    students = data;
}