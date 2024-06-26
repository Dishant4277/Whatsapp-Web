export const downloadMedia = async (e, originalImage) => {
  e.preventDefault();
  try {
    fetch(originalImage)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;

        const nameSplit = originalImage.split("/");
        const duplicateName = nameSplit.pop();

        // the filename you want
        a.download = "" + duplicateName + "";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) =>
        console.log("Error while downloading the image ", error)
      );
  } catch (error) {
    console.log("Error while downloading the image ", error);
  }
};

export const formatDate = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

export const formatDateMonth = (date1) => {
  const date = new Date(date1).getDate();
  const month = new Date(date1).getMonth();
  const year = new Date(date1).getFullYear();

  return `${date < 10 ? "0" + date : date} ${
    month < 10 ? "0" + month : month
  } ${year}`;
};

export const today = (messageDate, messages) => {
  const today = new Date().getDate();
  let todayMessages = messages?.filter(
    (m) => new Date(m.createdAt).getDate() === today
  );

  todayMessages?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Get the earliest message
  const earliestMessage = todayMessages && todayMessages[0];
  if (earliestMessage?.createdAt === messageDate) return "Today";

  return null;
};
