const deleteForms = document.querySelectorAll('.delete-form')
deleteForms.forEach(deleteForm => {
  deleteForm.addEventListener('submit', (event) => {
    event.preventDefault()
    event.stopPropagation()
    const name = event.target.dataset.name

    Swal.fire({
      title: `你確定要刪除${name}嗎？`,
      icon: "warning",
      showCancelButton: true
    })
      .then(result => {
        if (result.value) {
          Swal.fire("已刪除")
          deleteForm.submit()
        } else {
          Swal.fire("沒刪掉呢")
        }
      })

  })
})