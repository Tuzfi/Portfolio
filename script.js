const body = document.body;
const langButtons = document.querySelectorAll('[data-language-option]');
const cards = document.querySelectorAll('.card');

function setLanguage(language) {
  body.dataset.language = language;
  const isEnglish = language === 'en';

  langButtons.forEach((button) => {
    const active = button.dataset.languageOption === language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  document.documentElement.lang = isEnglish ? 'en' : 'pt-BR';
  document.querySelectorAll('.card__edge-nav').forEach((button) => {
    const direction = button.dataset.direction;
    button.setAttribute(
      'aria-label',
      isEnglish
        ? `Open ${direction === 'previous' ? 'previous' : 'next'} card`
        : `Abrir carta ${direction === 'previous' ? 'anterior' : 'seguinte'}`
    );
  });
}

function closeSelectedCard() {
  const openCard = document.querySelector('.card.is-open');
  if (!openCard) {
    return;
  }

  openCard.classList.remove('is-open');
  openCard.setAttribute('aria-expanded', 'false');
  openCard.focus();
}

function openCard(card) {
  cards.forEach((item) => {
    if (item !== card) {
      item.classList.remove('is-open');
      item.setAttribute('aria-expanded', 'false');
    }
  });

  card.classList.add('is-open');
  card.setAttribute('aria-expanded', 'true');
  card.querySelector('.card__close')?.focus();
}

cards.forEach((card, index) => {
  const detail = card.querySelector('.card__detail');

  ['previous', 'next'].forEach((direction) => {
    const button = document.createElement('button');
    const offset = direction === 'previous' ? -1 : 1;
    const adjacentCard = cards[index + offset];

    button.className = `card__edge-nav card__edge-nav--${direction}`;
    button.type = 'button';
    button.dataset.direction = direction;
    button.setAttribute('aria-label', '');
    button.disabled = !adjacentCard;
    button.textContent = direction === 'previous' ? '‹' : '›';
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      if (adjacentCard) {
        openCard(adjacentCard);
      }
    });

    detail.append(button);
  });
});

langButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.languageOption));
});

cards.forEach((card) => {
  card.setAttribute('aria-expanded', 'false');

  card.addEventListener('click', (event) => {
    if (event.target.closest('.card__close')) {
      return;
    }

    if (card.classList.contains('is-open')) {
      return;
    }

    openCard(card);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (card.classList.contains('is-open')) {
        closeSelectedCard();
      } else {
        openCard(card);
      }
    }

    if (event.key === 'Escape' && card.classList.contains('is-open')) {
      closeSelectedCard();
    }
  });

  const closeButton = card.querySelector('.card__close');
  closeButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    closeSelectedCard();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSelectedCard();
  }
});

setLanguage('pt');
