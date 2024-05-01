
import useDrivePicker from 'react-google-drive-picker'


function Picker({clientId,api_key}) {
  const [openPicker, authResponse] = useDrivePicker();  
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: clientId,
      developerKey: api_key,
      viewId: "DOCS",
      token: 'TOKEN', 
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