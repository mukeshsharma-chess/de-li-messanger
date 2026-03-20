import Api from '.';
import { endpoints } from './endpoints';

// let baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default class fetchApi extends Api {

    Login(data) {
        let url = this.buildUrl(endpoints.Login.login, "full")
        return this.fetch(url, "POST", data).then(response => response)
    }

    AddNewWorkSpace(data) {
        let url = this.buildUrl(endpoints.WorkSpaces.workSpaces, "full")
        return this.fetch(url, "POST", data).then(response => response)
    }

    GetAllWorkSpace(data) {
        let url = this.buildUrl(endpoints.WorkSpaces.workSpaces, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    AddNewChannel(data) {
        let url = this.buildUrl(`${endpoints.WorkSpaces.workSpaces}/${data.id}/channels`, "full")
        return this.fetch(url, "POST", data.formPayload).then(response => response)
    }

    GetChannelMembers(data) {
        let url = this.buildUrl(`${endpoints.Channels.channel}/${data.channelId}/members`, "full")
        return this.fetch(url, "GET", null, null).then(response => response)
    }

    GetLatestMessagesChannel(data) {
        let url = this.buildUrl(`${endpoints.Channels.channel}/${data.channelId}/messages`, "full")
        return this.fetch(url, "GET", null, null).then(response => response)
    }

    SendMessageToChannel(data) {
        let url = this.buildUrl(`${endpoints.Channels.messages}`, "full")
        return this.fetch(url, "POST", data).then(response => response)
    }

    DeleteMessageToChannel(data) {
        let url = this.buildUrl(`${endpoints.Channels.messages}/${data}`, "full")
        return this.fetch(url, "DELETE", null).then(response => response)
    }

    GetAllDmUsers(data) {
        let url = this.buildUrl(endpoints.Dms.users, "full")
        return this.fetch(url, "GET", null, data).then(response => response)
    }

    startConverrsationForDm(data) {
        let url = this.buildUrl(`${endpoints.Dms.conversations}/start/${data.user_two_id}`, "full")
        return this.fetch(url, "POST", data).then(response => response)
    }

    GetAllDmConversations() {
        let url = this.buildUrl(endpoints.Dms.conversations, "full")
        return this.fetch(url, "GET", null, null).then(response => response)
    }

    ShowDirectMessage(data) {
        let url = this.buildUrl(`${endpoints.Dms.conversations}/${data.id}`, "full")
        return this.fetch(url, "GET", null).then(response => response)
    }

    DMessageToPerticularUser(data) {
        let url = this.buildUrl(`${endpoints.Dms.conversations}/${data.id}/messages`, "full")
        return this.fetch(url, "POST", data.formData).then(response => response)
    }
    
    UpdateDMessage(data) {
        let url = this.buildUrl(`${endpoints.Dms.conversations}/messages/${data.id}`, "full")
        return this.fetch(url, "PUT", data.formData).then(response => response)
    }

    DeleteDMessage(data) {
        let url = this.buildUrl(`${endpoints.Dms.conversations}/messages/${data}`, "full")
        return this.fetch(url, "DELETE", null).then(response => response)
    }
}