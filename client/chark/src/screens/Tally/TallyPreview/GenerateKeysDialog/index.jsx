import React, { useEffect } from "react"
import { Modal, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { KeyConfig } from "wyseman/lib/crypto";
import useSocket from "../../../../hooks/useSocket";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { storePrivateKey, storePublicKey } from "../../../../utils/keychain-store";
import { updatePublicKey } from "../../../../services/profile";

export const GenerateKeysDialog = ({ visible, onDismiss, onKeySaved, onError }) => {
  const subtle = window.crypto.subtle;
  const { wm } = useSocket();
  const { user } = useCurrentUser();
  const user_ent = user?.curr_eid;

  const storeKeys = (publicKey, privateKey) => {
    updatePublicKey(wm, {
      public_key: publicKey,
      where: {
        user_ent
      }
    }).then(() => {
      return Promise.all(
        [
          storePublicKey(JSON.stringify(publicKey)),
          storePrivateKey(JSON.stringify(privateKey))
        ]
      )
    }).then(() => {
      onKeySaved();
    }).catch(err => {
      console.log("EXCEPTION ==> ", err);
      onError(err);
    }).finally(onDismiss);
  }

  useEffect(() => {
    async function generateKeys() {
      try {
        const keyPair = await subtle.generateKey(KeyConfig, true, ['sign', 'verify']);
        const currentKeyPair = { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
        const pubKey = await subtle.exportKey('jwk', keyPair.publicKey);
        const priKey = await subtle.exportKey('jwk', currentKeyPair.privateKey);
        storeKeys(pubKey, priKey);
      } catch (err) {
        onError(err)
      } finally {
        onDismiss();
      }
    }

    if (visible) {
      generateKeys();
    }
  }, [visible]);

  return <Modal visible={visible} transparent={true} animationType="fade" onDismiss={onDismiss}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" color="#000000" />
        <Text>Generating Keys</Text>
      </View>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
});