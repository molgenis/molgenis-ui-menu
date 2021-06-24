import { shallowMount } from '@vue/test-utils'
import AnalyticsText from '@/components/AnalyticsText.vue'

describe('AnalyticsText', () => {
  const wrapper = shallowMount(AnalyticsText, { propsData: { trackingId: 'test' } })

  it('has a optout button', () => {
    expect(wrapper.contains('a.optout')).toBe(true)
  })

  it('sets a ga cookie', () => {
    expect(document.cookie).toBe('')
    const button = wrapper.find('a.optout')
    button.trigger('click')
    expect(document.cookie).toBe('ga-disable-test=true')
  })

  it('can store cookiestate', () => {
    // @ts-ignore
    wrapper.vm.checkCookie()
    // @ts-ignore
    expect(wrapper.vm.optout).toBeTruthy()
  })
})
