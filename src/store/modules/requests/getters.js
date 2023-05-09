export default {
    getRequests(state, _, _1, rootGetters) {
        
        const coachId = rootGetters.userId;
        return state.requests.filter(req => req.coachId === coachId);
    }
}