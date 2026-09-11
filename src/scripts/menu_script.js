const navtabContainer = document.querySelector('.navtab');
const entries = document.querySelectorAll('.navtab li');

function checkTabWrapping() {
  if (entries.length === 0) return;

  const entryData = Array.from(entries).map(el => {
    return {
      element: el,
      top: el.getBoundingClientRect().top
    };
  });

  const positions = entryData.map(d => d.top);
  const minTop = Math.min(...positions);
  const maxTop = Math.max(...positions);

  if (maxTop - minTop > 4) { 
    navtabContainer.classList.add('is-wrapped');
    navtabContainer.classList.add('has-extra-padding');
    
    entryData.forEach(item => {
      const rowLevel = Math.round((item.top - minTop) / 10); 
      item.element.style.zIndex = (rowLevel + 1) * 10; 
      
      if (Math.abs(item.top - minTop) < 4) {
        item.element.classList.add('top-layer-tab');
      } else {
        item.element.classList.remove('top-layer-tab');
      }
      
      if (Math.abs(item.top - maxTop) < 4) {
        item.element.classList.add('bottom-layer-tab');
      } else {
        item.element.classList.remove('bottom-layer-tab');
      }
    });
  } else {
    navtabContainer.classList.remove('is-wrapped');
    navtabContainer.classList.remove('has-extra-padding');
    
    entries.forEach((entry, index) => {
      entry.style.zIndex = entries.length - index; 
      entry.classList.remove('top-layer-tab');
      entry.classList.remove('bottom-layer-tab');
    });
  }
}

const resizeObserver = new ResizeObserver(() => {
  requestAnimationFrame(checkTabWrapping);
});

resizeObserver.observe(navtabContainer);
checkTabWrapping();
