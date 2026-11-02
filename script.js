/**
 * TALLER DE RESPONSABILIDAD SOCIAL UNIVERSITARIA
 * Concientización en Seguridad Digital y Prevención de Phishing
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminalSimulation();
  initQuiz();
  initAttendanceConfirmation();
});

/* ==========================================================================
   1. TERMINAL SIMULATION LOGS
   ========================================================================== */
function initTerminalSimulation() {
  const terminalBody = document.getElementById('terminal-logs');
  if (!terminalBody) return;

  const logs = [
    { text: 'Conexión HTTPS entrante detectada...', type: 'normal', delay: 200 },
    { text: 'Agente de usuario (Navegador/Dispositivo) analizado...', type: 'normal', delay: 700 },
    { text: 'Validación de conciencia del usuario: ENLACE ABIERTO SIN VERIFICAR', type: 'warning', delay: 1300 },
    { text: '¡ALERTA! El usuario cayó en la prueba de simulación.', type: 'danger', delay: 1900 },
    { text: 'Activando módulo educativo y preventivo...', type: 'success', delay: 2400 }
  ];

  terminalBody.innerHTML = '';

  logs.forEach((item) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'terminal-line';

      let textClass = 'terminal-text';
      if (item.type === 'success') textClass = 'terminal-success';
      if (item.type === 'warning') textClass = 'terminal-warning';
      if (item.type === 'danger') textClass = 'terminal-warning';

      line.innerHTML = `<span class="terminal-prompt">&gt;</span> <span class="${textClass}">${item.text}</span>`;
      terminalBody.appendChild(line);
    }, item.delay);
  });
}

/* ==========================================================================
   2. INTERACTIVE QUIZ: ¿ES SEGURO O ES PHISHING?
   ========================================================================== */
const quizQuestions = [
  {
    sender: 'soporte-estudiantes@alerta-cuentas-univ.xyz',
    senderName: 'Soporte Tecnológico Universitario',
    subject: '⚠️ URGENTE: Su cuenta será suspendida en 2 horas por inactividad',
    message: 'Hemos detectado accesos no autorizados. Para evitar el bloqueo inmediato y la pérdida de sus cursos, ingrese sus credenciales aquí:',
    url: 'https://login-verificacion-estudiantes.tk/auth',
    isPhishing: true,
    explanation: '¡Es Phishing! 🚩 Fíjate en el dominio del remitente (.xyz) y el enlace (.tk). La universidad jamás te amenazará con darte de baja en 2 horas ni usará enlaces con dominios gratuitos o sospechosos.'
  },
  {
    sender: 'notificaciones@campus.uniminuto.edu.co',
    senderName: 'Aulas Virtuales UNIMINUTO',
    subject: 'Recordatorio: Próxima entrega - Práctica en Responsabilidad Social',
    message: 'Hola, te recordamos que tienes una actividad pendiente en el aula virtual de Responsabilidad Social (Inclusión Digital). Puedes revisar el cronograma en el portal oficial:',
    url: 'https://campus.uniminuto.edu.co/aulas/actividad-4',
    isPhishing: false,
    explanation: '¡Es Seguro! ✅ El remitente y el enlace provienen del dominio oficial institucional (.uniminuto.edu.co) y no solicita que ingreses claves bancarias o datos confidenciales de emergencia.'
  },
  {
    sender: '+57 311 000 0000 (SMS de número desconocido)',
    senderName: 'Mensajería / Paquetería Express',
    subject: 'Aviso de Entrega Fallida',
    message: 'Su paquete tiene un retraso por falta de pago de aduana ($2.500 COP). Ingrese para pagar con tarjeta y autorizar la entrega hoy mismo:',
    url: 'http://dhl-rastreo-entrega-urgente.biz/pagar',
    isPhishing: true,
    explanation: '¡Es Phishing (Smishing)! 🚩 Es una de las estafas más comunes por SMS. El enlace usa HTTP (no seguro) y el dominio termina en .biz buscando robar los datos de tu tarjeta de crédito o débito.'
  }
];

let currentQuestionIndex = 0;
let userScore = 0;

function initQuiz() {
  const btnSafe = document.getElementById('quiz-btn-safe');
  const btnPhishing = document.getElementById('quiz-btn-phishing');
  const nextBtn = document.getElementById('quiz-btn-next');

  if (!btnSafe || !btnPhishing) return;

  renderQuestion(currentQuestionIndex);

  btnSafe.addEventListener('click', () => handleAnswer(false));
  btnPhishing.addEventListener('click', () => handleAnswer(true));

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        renderQuestion(currentQuestionIndex);
      } else {
        showQuizCompletion();
      }
    });
  }
}

function renderQuestion(index) {
  const q = quizQuestions[index];
  const stepLabel = document.getElementById('quiz-step-label');
  const senderEl = document.getElementById('quiz-scenario-sender');
  const messageEl = document.getElementById('quiz-scenario-message');
  const linkEl = document.getElementById('quiz-scenario-link');
  const feedbackEl = document.getElementById('quiz-feedback');
  const btnSafe = document.getElementById('quiz-btn-safe');
  const btnPhishing = document.getElementById('quiz-btn-phishing');

  if (stepLabel) stepLabel.textContent = `Caso ${index + 1} de ${quizQuestions.length}`;
  if (senderEl) {
    senderEl.innerHTML = `<strong>Remitente:</strong> ${escapeHtml(q.senderName)} &lt;${escapeHtml(q.sender)}&gt;<br><strong>Asunto:</strong> ${escapeHtml(q.subject)}`;
  }
  if (messageEl) messageEl.textContent = q.message;
  if (linkEl) linkEl.innerHTML = `🔗 ${escapeHtml(q.url)}`;

  if (feedbackEl) {
    feedbackEl.className = 'quiz-feedback-box';
    feedbackEl.style.display = 'none';
    feedbackEl.innerHTML = '';
  }

  if (btnSafe) btnSafe.disabled = false;
  if (btnPhishing) btnPhishing.disabled = false;
}

function handleAnswer(selectedIsPhishing) {
  const q = quizQuestions[currentQuestionIndex];
  const isCorrect = (selectedIsPhishing === q.isPhishing);
  const feedbackEl = document.getElementById('quiz-feedback');
  const btnSafe = document.getElementById('quiz-btn-safe');
  const btnPhishing = document.getElementById('quiz-btn-phishing');
  const scoreBadge = document.getElementById('quiz-score-badge');

  if (btnSafe) btnSafe.disabled = true;
  if (btnPhishing) btnPhishing.disabled = true;

  if (isCorrect) {
    userScore++;
  }

  if (scoreBadge) {
    scoreBadge.textContent = `Aciertos: ${userScore}/${quizQuestions.length}`;
  }

  if (feedbackEl) {
    feedbackEl.className = `quiz-feedback-box show ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackEl.style.display = 'block';

    const isLast = (currentQuestionIndex === quizQuestions.length - 1);
    const nextButtonText = isLast ? 'Ver resultado final' : 'Siguiente caso →';

    feedbackEl.innerHTML = `
      <div style="font-weight: 700; margin-bottom: 0.5rem; font-size: 1.05rem;">
        ${isCorrect ? '🎉 ¡Correcto! Buen análisis.' : '❌ ¡Cuidado! Respuesta incorrecta.'}
      </div>
      <p style="margin-bottom: 0.75rem;">${escapeHtml(q.explanation)}</p>
      <button id="quiz-btn-next" class="btn-next-question">${nextButtonText}</button>
    `;

    const newNextBtn = document.getElementById('quiz-btn-next');
    if (newNextBtn) {
      newNextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
          renderQuestion(currentQuestionIndex);
        } else {
          showQuizCompletion();
        }
      });
    }
  }
}

function showQuizCompletion() {
  const quizBox = document.getElementById('quiz-box-container');
  if (!quizBox) return;

  const total = quizQuestions.length;
  let summaryMessage = '';

  if (userScore === total) {
    summaryMessage = '🌟 ¡Excelente! Tienes un ojo entrenado para detectar trampas digitales y enlaces falsos.';
  } else if (userScore >= 1) {
    summaryMessage = '👍 Buen intento. Recuerda siempre revisar el dominio del enlace y el remitente antes de hacer clic.';
  } else {
    summaryMessage = '⚠️ Mucha precaución: En internet un solo descuido puede costar tus cuentas. ¡Sigue las recomendaciones!';
  }

  quizBox.innerHTML = `
    <div style="text-align: center; padding: 2rem 1rem;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">🛡️</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.7rem; color: #fff; margin-bottom: 0.75rem;">
        Práctica Finalizada: ${userScore}/${total} Aciertos
      </h3>
      <p style="color: #cbd5e1; max-width: 500px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
        ${summaryMessage}
      </p>
      <button id="btn-restart-quiz" class="btn-next-question" style="margin: 0 auto;">
        Repetir simulador
      </button>
    </div>
  `;

  const restartBtn = document.getElementById('btn-restart-quiz');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentQuestionIndex = 0;
      userScore = 0;
      location.reload();
    });
  }
}

/* ==========================================================================
   3. ATTENDANCE & AWARENESS CONFIRMATION
   ========================================================================== */
function initAttendanceConfirmation() {
  const btn = document.getElementById('btn-confirm-attendance');
  const confirmedCard = document.getElementById('attendance-confirmed-state');

  if (!btn || !confirmedCard) return;

  const hasConfirmed = localStorage.getItem('taller_phishing_confirmado');
  if (hasConfirmed) {
    btn.style.display = 'none';
    confirmedCard.style.display = 'block';
  }

  btn.addEventListener('click', () => {
    localStorage.setItem('taller_phishing_confirmado', 'true');
    btn.style.display = 'none';
    confirmedCard.style.display = 'block';

    // Micro visual trigger
    confirmedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
