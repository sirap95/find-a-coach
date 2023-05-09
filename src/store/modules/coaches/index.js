import coachesMutations from "./mutations";
import coachesActions from "./actions";
import coachesGetters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
          lastFetch: null,
            coaches:[
                {
                  id: 'c1',
                  firstName: 'Gregorio',
                  lastName: 'Siravo',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    "I'm Gregorio and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'Julie',
                  lastName: 'Jones',
                  areas: ['frontend', 'career'],
                  description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                  hourlyRate: 30
                }
              ]
        }
    },
    mutations: coachesMutations,
    actions: coachesActions,
    getters: coachesGetters

}