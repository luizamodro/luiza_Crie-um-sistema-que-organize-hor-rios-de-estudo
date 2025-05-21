document.addEventListener('DOMContentLoaded', function() {
  const addScheduleButton = document.getElementById('add-schedule');
  const timetableContainer = document.getElementById('timetable');
  const subjectInput = document.getElementById('subject');
  const dayOfWeekSelect = document.getElementById('day-of-week');
  const startTimeInput = document.getElementById('start-time');
  const endTimeInput = document.getElementById('end-time');

  const agenda = {
    Segunda: [],
    Terça: [],
    Quarta: [],
    Quinta: [],
    Sexta: [],
    Sábado: [],
    Domingo: []
  };

  // Função para renderizar a agenda
  function renderAgenda() {
    timetableContainer.innerHTML = '';
    for (const day in agenda) {
      const dayContainer = document.createElement('div');
      dayContainer.classList.add('day');

      const dayTitle = document.createElement('h3');
      dayTitle.textContent = day;
      dayContainer.appendChild(dayTitle);

      agenda[day].forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');
        
        const scheduleContent = document.createElement('span');
        scheduleContent.textContent = `${item.subject} | ${item.startTime} - ${item.endTime}`;
        scheduleItem.appendChild(scheduleContent);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', function() {
          // Remover o horário da agenda
          const index = agenda[day].indexOf(item);
          agenda[day].splice(index, 1);
          renderAgenda();
        });

        scheduleItem.appendChild(removeButton);
        dayContainer.appendChild(scheduleItem);
      });

      timetableContainer.appendChild(dayContainer);
    }
  }

  // Adicionar horário
  addScheduleButton.addEventListener('click', function() {
    const subject = subjectInput.value.trim();
    const dayOfWeek = dayOfWeekSelect.value;
    const startTime = startTimeInput.value.trim();
    const endTime = endTimeInput.value.trim();

    if (subject === '' || startTime === '' || endTime === '') {
      alert('Preencha todos os campos!');
      return;
    }

    // Adicionar o horário na agenda do dia selecionado
    agenda[dayOfWeek].push({
      subject,
      startTime,
      endTime
    });

    // Limpar os campos de entrada
    subjectInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';

    // Atualizar a agenda
    renderAgenda();
  });

  // Inicializar a renderização da agenda
  renderAgenda();
});