const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#timesheet-name').value.trim();
    const task = document.querySelector('#timesheet-task').value.trim();
    const hours = document.querySelector('#timesheet-desc').value.trim();
  
    if (name && task && hours) {
      const response = await fetch(`/api/timesheets`, {
        method: 'POST',
        body: JSON.stringify({ name, task, hours }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create timesheet');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/timesheets/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete timesheet');
      }
    }
  };
  
  document
    .querySelector('.new-timesheet-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.timesheet-list')
    .addEventListener('click', delButtonHandler);
  