import './About.css';

export default function About() {
  return (
    <div className="about-container">
        <h1 className="about-title">About</h1>
        <p className="about-text">
          Добро пожаловать в мой проект! 🚀  
          Я люблю создавать полезные и красивые веб-приложения.
        </p>
        <p className="about-text">
          Моя цель — сделать красивое и полезное веб-приложение на курс ReactJs!
        </p>

        <div className="about-cards">
          <div className="about-card">
            <h3>💡 Что меня вдохновляет</h3>
            <p>Создание интерфейсов, которые делают жизнь людей проще и приятнее.</p>
          </div>
          <div className="about-card">
            <h3>🎯 Цель</h3>
            <p>Углубить знания в React и научиться разрабатывать полноценные веб-приложения.</p>
          </div>
          <div className="about-card">
            <h3>📚 Обучение</h3>
            <p>Я прохожу университетский курс по React и применяю полученные знания на практике.</p>
          </div>
        </div>
        <div className="about-contacts">
          <h2>📬 Контакты</h2>
          <p>Email: <a href="mailto:example@email.com">example@email.com</a></p>
          <p>GitHub: <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">github.com/username</a></p>
          <p>Telegram: <a href="https://t.me/username" target="_blank" rel="noopener noreferrer">@username</a></p>
        </div>
      </div>
  );
}
