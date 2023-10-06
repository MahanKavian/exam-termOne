let state = {
    liElms: [],
    objElms: [],
    textIsOpen: 0
}

function toggleActiveClassHandler() {
    for (let li of state.liElms) {
        if (Number(li.getAttribute('data-content-id')) === state.textIsOpen) {
            li.classList.add('navs__item--active');
        } else {
            li.classList.remove('navs__item--active');
        }
    }
}

function hideContentHandler() {
    for (let li of state.liElms) {
        if (parseInt(getComputedStyle(li).height) > 47) {
            li.style.height = '46.8px';
            li.style.overflow = 'hidden';
            li.setAttribute('data-text', li.textContent)
            li.textContent = li.textContent.slice(0, 4) + '...';
        }
    }
}

function createContents(e) {
    state.textIsOpen = Number(this.getAttribute('data-content-id'));
    document.querySelector('#contentBox').textContent = '';
    for (let i = 0; i < state.objElms.length; i++) {
        if (Number(this.getAttribute('data-content-id')) === i) {
            for (let text of state.objElms[i].body) {
                let divElm = document.createElement('div');
                divElm.classList.add('col-12');
                divElm.classList.add('col-lg');
                divElm.classList.add('gy-3');
                divElm.textContent = text;

                document.querySelector('#contentBox').appendChild(divElm);
            }
        }
    }

    toggleActiveClassHandler();
}

function createTitlesHandler(tabs) {
    let id = 0;
    for (let obj of tabs) {
        let liElm = document.createElement('li');
        liElm.classList.add('navs__item');
        liElm.textContent = obj.title;
        liElm.setAttribute('data-content-id', id);
        liElm.addEventListener('click', createContents);
        if (obj.is_active) {
            liElm.classList.add('navs__item--active');

            for (let text of obj.body) {
                let divElm = document.createElement('div');
                divElm.classList.add('col-12');
                divElm.classList.add('col-lg');
                divElm.classList.add('gy-3');
                divElm.textContent = text;

                document.querySelector('#contentBox').appendChild(divElm);
            }
        }
        document.querySelector('.navs__group').appendChild(liElm);

        state.liElms.push(liElm);
        state.objElms.push(obj);

        hideContentHandler();

        id++;
    }

}

async function getData() {
    let res = await fetch('https://lms.navaxcollege.com/exam.php');
    let resJson = await res.json();
    let tabs = resJson.data.tabs;

    createTitlesHandler(tabs);
}

document.addEventListener('DOMContentLoaded', getData);
