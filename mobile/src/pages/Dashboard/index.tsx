import React from 'react';
import { Button, View } from 'react-native';

import { useAuth } from '../../hooks/auth';


const Dashboard: React.FC = () => {
const { signOut }  = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Out" onPress={signOut} />
    </View>
  );
}

export default Dashboard;
