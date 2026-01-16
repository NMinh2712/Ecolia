// MẢNH Frontend JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  })

  // Form step navigation
  const aiForm = document.getElementById("ai-form")
  if (aiForm) {
    let currentStep = 1
    const totalSteps = 4

    window.nextStep = (stepNumber) => {
      currentStep = stepNumber
      window.updateSteps()
      window.scrollToForm()
    }

    window.updateSteps = () => {
      document.querySelectorAll(".step").forEach((el, idx) => {
        el.classList.remove("active", "completed")
        if (idx + 1 < currentStep) {
          el.classList.add("completed")
        } else if (idx + 1 === currentStep) {
          el.classList.add("active")
        }
      })

      document.querySelectorAll("[data-step]").forEach((el) => {
        el.style.display = el.getAttribute("data-step") == currentStep ? "block" : "none"
      })
    }

    window.scrollToForm = () => {
      const form = document.getElementById("ai-form")
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    // Initialize
    window.updateSteps()

    // Color selection
    document.querySelectorAll(".color-option").forEach((option) => {
      option.addEventListener("click", function () {
        document.querySelectorAll(".color-option").forEach((o) => o.classList.remove("selected"))
        this.classList.add("selected")
        document.getElementById("color-input").value = this.getAttribute("data-color")
      })
    })

    // Submit form
    aiForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      try {
        const response = await fetch("/api/ai-reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        const result = await response.json()
        window.location.href = `/result/${result.sessionId}`
      } catch (error) {
        console.error("Error:", error)
        alert("Có lỗi xảy ra. Vui lòng thử lại.")
      }
    })
  }

  // Fade in animation on load
  document.querySelectorAll(".fade-in").forEach((el, idx) => {
    el.style.animationDelay = `${idx * 0.1}s`
  })
})
