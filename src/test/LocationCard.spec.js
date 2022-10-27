import { mount } from '@vue/test-utils'
import LocationCard from '@/components/LocationCard.vue'

describe('LocationCard', () => {
  test(`should mount the component 'LocationCard'`, () => {
    const location = {
      id: 1,
      name: 'First location',
      type: 'Location mock',
      dimension: 'First dimension',
      residents: ['One resident', 'Other resident'],
    }
    const wrapper = mount(LocationCard, {
      propsData: {
        location,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
