import { mount } from '@vue/test-utils'
import LocationCard from '@/components/LocationCard.vue'

describe('LocationCard', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(LocationCard)
    expect(wrapper.vm).toBeTruthy()
  })
})
