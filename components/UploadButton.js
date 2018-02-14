import { Button } from "semantic-ui-react"

class UploadButton extends React.Component {
    render () {
        let textInput = null
        const uploadFile = (file) => {
            const formData = new FormData()
            formData.append("file", file)
            fetch("/api/upload", {
                    method: "post",
                    body: formData
                })
                .then(() => {
                    textInput.value = ""  // reset input
                    console.log("Uploaded file.")
                })
                .catch(err => console.log(err))
        }
        return (
            <div>
                <input 
                    type="file"
                    ref={(input) => { textInput = input }}
                    onChange={() => uploadFile(textInput.files[0])}
                    style={{ display: "none" }} />
                <Button fluid as="a" size="large" onClick={() => textInput.click()}>Upload</Button>
            </div>
        )
    }
}

export default UploadButton