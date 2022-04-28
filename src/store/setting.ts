import { defineStore } from 'pinia'
import { FileSetting } from '@/types/models/settings'
import { LocalStorageKeyEnum } from '@/types/commons/storage'

export interface SettingState {
  fileSetting: FileSetting
}

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => {
    return {
      fileSetting: {} as FileSetting,
    }
  },
  getters: {

  },
  actions: {
    /**
     * Set setting
     */
    async initSetting () {
      const fileSettingStorage = (await chrome.storage.sync.get(LocalStorageKeyEnum.FILE_SETTING))[LocalStorageKeyEnum.FILE_SETTING] as FileSetting
      this.fileSetting = {
        saveAs: fileSettingStorage.saveAs || false
      } as FileSetting
    },
    /**
     * set Setting list filter
     * @param payload - List Filter to set
     */
    async setFileSetting (payload: FileSetting) {
      await chrome.storage.sync.set({ [LocalStorageKeyEnum.FILE_SETTING]: {
        saveAs: payload.saveAs
      } })
      this.fileSetting = payload
    },
  }
})
