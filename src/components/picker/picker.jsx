
import useDrivePicker from 'react-google-drive-picker'


function Picker({clientId,api_key}) {
  const [openPicker, authResponse] = useDrivePicker();  
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: clientId,
      developerKey: api_key,
      viewId: "DOCS",
      token: 'ya29.a0Ad52N3_pa0ck-23pxry14f-_xOpPSLNgqXEY3FKD7ewk2WjXoJRJhQkovy7IHw5PfDrzlqOvG-PlU8hlEif--Fa56dJ-rozKTuhrloKtXvXNRZ1it0CWaUvLs9KQRLrLl0ao_s3PZz05NYS0apLdClbKCr6DjRu4GRL7aCgYKAUQSARASFQHGX2Misjy-TrlfC4wN0Ecm3ymJDQ0171', 
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      viewMimeTypes:'application/vnd.google-apps.spreadsheet',
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }


  
  return (
    <div>
        <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default Picker;