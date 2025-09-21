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

}