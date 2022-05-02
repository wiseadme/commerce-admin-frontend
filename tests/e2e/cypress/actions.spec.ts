import { mount } from '@cypress/vue'
import { AppHeader } from '../../../src/shared/components/AppHeader'

describe('AppHeader', () => {
  it('renders a message', () => {
    // const name = 'Hello Cypress Component Testing!'
    mount(AppHeader as any, {})


    cy.get('.app-header').should('exist')
  })
})
