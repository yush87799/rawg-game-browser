export const updateUserBookmarks = async (user, bookmarks) => {
  try {
    await user.update({
      publicMetadata: {
        bookmarks,
      },
    });
  } catch (error) {
    console.error('Error updating user bookmarks:', error);
  }
};

export const getUserBookmarks = (user) => {
  try {
    return user?.publicMetadata?.bookmarks || [];
  } catch (error) {
    console.error('Error fetching user bookmarks:', error);
    return [];
  }
};