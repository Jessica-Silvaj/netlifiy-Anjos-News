function openModal(title, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('zodiacModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('zodiacModal').style.display = 'none';
}