import { mount } from '@cypress/vue'
import { AppHeader } from '@app/components/AppHeader'

describe('AppHeader', () => {
  it('mount component and test element', () => {
    mount(AppHeader as any, {})

    cy.get('v-toolbar').should('exist')
  })
})
