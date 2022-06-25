const addHoverToLinks = (links, targets) =>{
    links.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            let thisID = e.currentTarget.dataset.path;
            if(link.getAttribute('data-path') == thisID) {
                link.classList.add('hover');
            }
            targets.forEach(target => {
                if(target.getAttribute('data-target') == thisID) {
                    target.classList.add('hover');
                }
            })
        });

        link.addEventListener('mouseleave', (e) => {
            let thisID = e.currentTarget.dataset.path;
            if(link.getAttribute('data-path') == thisID) {
                link.classList.remove('hover');
            }
            targets.forEach(target => {
                if(target.getAttribute('data-target') == thisID) {
                    target.classList.remove('hover');
                }
            })
        })
    })  
}
export { addHoverToLinks };