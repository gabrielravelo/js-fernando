import modalHtml from './render-modal.html?raw';
import './render-modal.css';

let modal, form;

export const showModal = () => {
    modal?.classList.remove('hide-modal');
};

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderModal = ( element ) => {
    if ( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');

    modal.addEventListener('click', (e) => {
        if ( e.target.className !== 'modal-container' ) return;

        hideModal();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData( form );
        const userLike = {};

        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = +value;
                continue;
            }

            if (key === 'isActive') {
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }

            userLike[key] = value;
        }
        // console.log(userLike);

        hideModal();
    });

    element.append( modal );
};
