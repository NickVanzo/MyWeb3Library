/**
 * license: MIT
 */

import MetaMaskOnboarding from "@metamask/onboarding";

const forwarderOrigin = 'http://localhost:3000';

const initialize = () => {
    const onboardButton = document.getElementById('connectButton');
    const getAccountsButton = document.getElementById('getAccounts');
    const getAccountsResult = document.getElementById('getAccountsResult');

    /**
     * 
     * @returns Check the ethereum binding on the window object to see if it's installed
     */
    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    //We create a new MetaMask onboarding object to use in our app
    const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

    /**
     * Start the onboarding process.
     * The onboard process let a new user install MetaMask
     */
    const onClickInstall = () => {
        onboardButton.innerText = 'Onboarding in progress';
        onboardButton.disabled = true;
        onboarding.startOnboarding();
    };

    /**
     * Will open the MetaMask UI
     * You should disable this button while the request is pending!
     */
    const onClickConnect = async () => {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error(error);
        }
    };

    /**
     * Check if MetaMask is installed. 
     * If it is not: call the install funcion
     * If it is: call the connect function
     * Disable the button, there's no need for it anymore
     */
    const MetaMaskClientCheck = () => {
        if (!isMetaMaskInstalled()) {
            onboardButton.innerText = 'Click here to install MetaMask!';
            onboardButton.onclick = onClickInstall;
            onboardButton.disabled = false;
        } else {
            onboardButton.innerText = 'Connect';
            onboardButton.onclick = onClickConnect;
            onboardButton.disabled = false;
        }
      };

    /**
     * Get the accounts of the wallet
     * We take the first address
     * eth_accounts returns a alist of addresses owned by us
     */
    getAccountsButton.addEventListener('click', async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
  });

    MetaMaskClientCheck();
};
window.addEventListener('DOMContentLoaded', initialize);