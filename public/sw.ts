/* eslint-env serviceworker */
/// <reference lib="webworker" />

import {precacheAndRoute} from 'workbox-precaching'

declare const self:ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)



import { initializeApp } from 'firebase/app'
import { getMessaging,onBackgroundMessage } from 'firebase/messaging/sw'
import { getToken } from 'firebase/messaging'