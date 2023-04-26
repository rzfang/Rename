document
  .querySelector('#file-loader>button')
  .addEventListener('click', async (Evt) => {
    const FlNms = await window.test.listFiles(); // file names.
    let InrHTML = FlNms
      .map(Nm => `<tr><td>${Nm}</td><td><input type="text" value="${Nm}"/></td></tr>`)
      .join(''); // inner HTML.

    document.querySelector('#file-list>tbody').innerHTML = InrHTML;
  });
