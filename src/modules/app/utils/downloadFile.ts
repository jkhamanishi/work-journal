// function downloadFile(text: string, name: string, type: string) {
//   const a = document.createElement("a");
//   const file = new Blob([text], {type: type});
//   const blobURL = URL.createObjectURL(file);
//   a.href = blobURL;
//   a.download = name;
//   a.click();
//   URL.revokeObjectURL(blobURL);
// }

async function downloadFile() {
  const fileHandle = await window.showSaveFilePicker({
    suggestedName: "journal.yaml",
    types: [{
      description: 'YAML Files',
      accept: {'text/yaml': ['.yaml' as const]},
    }]
  });
}


export default downloadFile;
