import { View, StyleSheet, Alert } from 'react-native';
import { format } from 'date-fns';

import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

import theme from '../theme';
import Text from './Text';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.lightBackground,
    padding: 10,
  },
  score: {
    width: theme.rating.size,
    height: theme.rating.size,
    borderRadius: theme.rating.size / 2,
    borderColor: theme.colors.primary,
    borderWidth: theme.rating.border,
    justifyContent: 'center',
  },
  ratingText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  reviewText: {
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  reviewButton: {
    // could not figure out how to get flexcontainer's gap property to work
    // in react native (might not be implemented), so this will do the trick
    marginRight: 10,
    padding: 5,
  },
});

const DATE_FORMAT = 'dd.MM.yyyy';

const ReviewItem = ({ review, userReviewView, refetchReviews }) => {
  const userName = review.user.username;
  const date = review.createdAt;
  const rating = review.rating;
  const text = review.text;
  const repositoryName = review.repository.fullName;

  const header = userReviewView ? repositoryName : userName;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Score rating={rating} />
        <ReviewContent header={header} date={date} text={text} />
      </View>
      {userReviewView && (
        <ReviewActions
          repositoryName={repositoryName}
          reviewId={review.id}
          repositoryId={review.repository.id}
          refetchReviews={refetchReviews}
        />
      )}
    </View>
  );
};

const Score = ({ rating }) => {
  return (
    <View style={styles.score}>
      <Text color="primary" fontWeight="bold" style={styles.ratingText}>
        {rating}
      </Text>
    </View>
  );
};

const ReviewContent = ({ header, date, text }) => {
  const dateObject = new Date(date);
  const dateHumanReadable = format(dateObject, DATE_FORMAT);

  return (
    <View style={styles.contentContainer}>
      <View>
        <Text fontWeight="bold">{header}</Text>
        <Text>{dateHumanReadable}</Text>
      </View>
      <View style={styles.reviewText}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const ReviewActions = ({
  repositoryName,
  reviewId,
  repositoryId,
  refetchReviews,
}) => {
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  const viewRepository = () => {
    navigate(`/repository/${repositoryId}`);
  };

  const onDeletePress = () => {
    const message = `Delete review of repository ${repositoryName}?`;
    Alert.alert('Delete review', message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteReview({ reviewId });
            refetchReviews();
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.buttonContainer}>
      <Button
        onSubmit={viewRepository}
        text={'View repository'}
        style={styles.reviewButton}
      />
      <Button
        onSubmit={onDeletePress}
        text={'Delete review'}
        style={styles.reviewButton}
        color="red"
      />
    </View>
  );
};

export default ReviewItem;
