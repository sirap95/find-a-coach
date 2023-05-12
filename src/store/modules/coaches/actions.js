export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;


    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas,
    };
//TODO: 1) CHANGE THE URL FOR THE REQUEST HERE
    const response = await fetch(
      `USE-YOUR-API-HERE`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );
    //const responseData = await response.json();
    if (!response.ok) {
      //error ...
    }
    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    //TODO: 2) CHANGE THE URL FOR THE REQUEST HERE
    const response = await fetch(
      `USE-YOUR-API-HERE`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
      context.commit("setCoaches", coaches);
      context.commit("setFetchTimestamp");
    }
  },
};
