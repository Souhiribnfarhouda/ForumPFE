import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const NotificationCard = ({ notification }: any) => {
  return (
    <Box
      bg="gray.100"
      border="1px solid"
      borderColor="gray.300"
      p={4}
      borderRadius="md"
      boxShadow="sm"
      mb={4}
    >
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Notification
      </Text>
      <Text fontSize="md" mb={2}>
        You have been added to the community {notification?.community?.name} by
        {notification?.community?.owner?.name}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {format(new Date(notification?.createdAt), 'Pp', { locale: fr })}
      </Text>
    </Box>
  );
};

export default NotificationCard;
