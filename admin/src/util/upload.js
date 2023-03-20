import axios from 'axios'

function upload(url,Form){
    // FormData格式提交给后端
    const params = new FormData()
    for (let i in Form) {
        params.append(i, Form[i])
    }
    return axios.post(url, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res=>res.data)
}

export default upload