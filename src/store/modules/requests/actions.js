export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
//TODO: 3) CHANGE THE URL FOR THE REQUEST HERE
    const response = await fetch(
      `USE-YOUR-API-FOR-REALTIME-DB-HERE`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    newRequest.id = responseData.name;

    context.commit("addRequest", newRequest);
  },

  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    //TODO: 4) CHANGE THE URL FOR THE REQUEST HERE
    const response = await fetch(
      `USE-YOUR-API-FOR-REALTIME-DB-HERE`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
