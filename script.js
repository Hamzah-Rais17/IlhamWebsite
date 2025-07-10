window.addEventListener('scroll', function () {
    const header = this.document.getElementById("HomeHeader");
    if (window.scrollY > 10) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    }
});

window.addEventListener('DOMContentLoaded', () => {
    if (document.head.id !== 'edit-file') return;

    const editableTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN'];
    const allElements = document.querySelectorAll('*');

    allElements.forEach(el => {
        if (editableTags.includes(el.tagName) && el.id) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = el.textContent.trim();

            // Preserve the original ID and class list
            input.id = `edit-${el.id}`;
            input.className = el.className; // Copy all classes
            input.dataset.originalId = el.id; // Store original ID for saving later

            input.style.width = '100%';

            el.replaceWith(input);
        }
    });

    // Create Save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save Changes';
    saveBtn.style.position = 'fixed';
    saveBtn.style.bottom = '20px';
    saveBtn.style.right = '20px';
    saveBtn.style.padding = '10px 20px';
    saveBtn.style.fontSize = '16px';
    saveBtn.style.zIndex = '9999';

    document.body.appendChild(saveBtn);

    saveBtn.addEventListener('click', () => {
        const editedInputs = document.querySelectorAll('input[id^="edit-"]');
        editedInputs.forEach(input => {
            const originalId = input.dataset.originalId;
            localStorage.setItem(`editable-${originalId}`, input.value);
        });

        // Optional: also update current input fields to reflect saved content
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el.id) {
                const savedText = localStorage.getItem(`editable-${el.id}`);
                if (savedText !== null) {
                    el.textContent = savedText;
                }
            }
        });

        alert('Changes saved! Go back to index.html to view updates.');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const allElements = document.querySelectorAll('*');

    allElements.forEach(el => {
        if (el.id) {
            const savedText = localStorage.getItem(`editable-${el.id}`);
            if (savedText !== null) {
                el.textContent = savedText;
            }
        }
    });
});
