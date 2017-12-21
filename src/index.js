import ChecklistQuestionnaire from './theme/components/checklist-questionnaire.vue'
import ChecklistQuestion from './theme/components/checklist-question.vue'
import ChecklistPossibleAnswer from './theme/components/checklist-possibleAnswer.vue'
import NotFound from './theme/components/notfound.vue'


// This is your plugin object. It can be exported to be used anywhere.
const EnablonGoComponentLibrary = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    Vue.component('ChecklistQuestionnaire', ChecklistQuestionnaire)
    Vue.component('ChecklistQuestion', ChecklistQuestion)
    Vue.component('ChecklistPossibleAnswer', ChecklistPossibleAnswer)
    Vue.component('NotFound', NotFound)
  }
};

export default EnablonGoComponentLibrary

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}