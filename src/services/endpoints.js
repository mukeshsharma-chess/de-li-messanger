//let url = "https://" + window.location.host + "/moslcms/cms/";
// let url = process.env.CMS_BASE_URL;

let baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export const endpoints = {

    baseApiUrl,

    Login: {
        login:`${baseApiUrl}/auth/login`
    },
    WorkSpaces: {
        workSpaces: `${baseApiUrl}/auth/workspaces`,
        
    },
    FileUpload: {
        upload: `${baseApiUrl}/upload`,
    },
}