import Vue from 'vue'
import Post from '../../../src/theme/post.vue'

describe('post.vue', () => {
  const createComponent = () => {
    const PostConstructor = Vue.extend(Post)
    const comp = new PostConstructor({
      propsData: {
        imageURL: 'http://images3.cinema.de/imedia/1280/9221280,p+pAOTf5W33d79VZKhw0y4uo9VhYgzR8kxZIURCSVITIDDY2dnsMaee6R5rVg26jc0U_+RMxgCv7C2q09Ep2xA==.jpg'
      }
    }).$mount()

    return comp
  }

  it('should render the link', () => {
    const comp = createComponent()
    var style = comp.$el.getAttribute('style')
    expect(style)
      .to.contain('http://images3.cinema.de/imedia/1280/9221280,p+pAOTf5W33d79VZKhw0y4uo9VhYgzR8kxZIURCSVITIDDY2dnsMaee6R5rVg26jc0U_+RMxgCv7C2q09Ep2xA==.jpg')
  })
  it("should update element's style when property link changes", (done) => {
    const comp = createComponent()
    var style = comp.$el.getAttribute('style')
    expect(style)
      .to.contain('http://images3.cinema.de/imedia/1280/9221280,p+pAOTf5W33d79VZKhw0y4uo9VhYgzR8kxZIURCSVITIDDY2dnsMaee6R5rVg26jc0U_+RMxgCv7C2q09Ep2xA==.jpg')

    comp.imageURL = 'http://www.lse.ac.uk/lse-information/assets/images/banners/LSE-logo-and-signage-on-building.jpg'
    Vue.nextTick(() => {
      // run the test after the dom has been regenerated
      expect(comp.$el.getAttribute('style'))
        .to.contain('http://www.lse.ac.uk/lse-information/assets/images/banners/LSE-logo-and-signage-on-building.jpg')
      done()
    })
  })
})
