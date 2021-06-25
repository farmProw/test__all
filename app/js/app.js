document.addEventListener("DOMContentLoaded", function (e) {

	let headerBurger = document.querySelector('.header__burger');
	let menuList = document.querySelector('.header__nav');
	let body = document.body;
	if (headerBurger) {
		headerBurger.addEventListener('click', function (e) {
			headerBurger.classList.toggle('active-burger');
			menuList.classList.toggle('active-burger');
			body.classList.toggle('_lock');
		})
	}
	//==============================header-menu============================ 
	let headerMenu = document.querySelector('.header__menu');
	if (headerMenu) {
		headerMenu.querySelectorAll('.submenu--open').forEach(li => {
			li.addEventListener('click', function (e) {
				headerMenu.querySelectorAll('.submenu--open').forEach(li => {
					li.classList.remove('chenge-height');
				});
				li.querySelector('.header__submenu').classList.toggle('active-submenu');
				li.classList.add('chenge-height')
			});
		})
	}
	//=============================header-select============================
	let headerSelects = document.querySelectorAll('.select');
	if (headerSelects.length) {
		headerSelects.forEach(select => {
			select.addEventListener('click', function (e) {

				this.querySelector('.select__list').classList.toggle('active')
				select.querySelectorAll('.select__list li').forEach(li => {

					li.addEventListener('click', function (e) {
						select.querySelectorAll('.select__list li').forEach(li => {
							li.querySelector('.select-item--checked').classList.remove('selected')
							li.querySelector('.select-title--hover').classList.remove('selected')
						});
						this.querySelector('.select-item--checked').classList.add('selected')
						this.querySelector('.select-title--hover').classList.add('selected')
						select.querySelector('.select-btn__text').textContent = li.querySelector('.select-title--hover').innerHTML;

					})
				})
				document.addEventListener('keydown', function (e) {
					if (e.key == 'Escape') {
						select.querySelector('.select__list').classList.remove('active')
					}
				})
				document.addEventListener('click', function (e) {
					if (!e.target.closest('.select')) {
						select.querySelector('.select__list').classList.remove('active')
					}
				})
			})


		})
	}
	//====================================scroll-listener===========================
	let header = document.querySelector('.header')
	window.addEventListener('scroll', function (e) {
		if (Math.floor(this.scrollY) > 135) {
			header.classList.add('change-height')
		} else {
			header.classList.remove('change-height')
		}

	})
	if (Math.floor(this.scrollY) > 135) header.classList.add('change-height')

	//==========================================accordion====================================================

	let accordions = document.querySelectorAll('.accordion__container');



	function accordion(accordions) {
		accordions = document.querySelectorAll(accordions);
		if (accordions.length) {
			accordions.forEach(accordion => {
				accordion.querySelector('.accordion__btn').addEventListener('click', function (e) {
					if (!this.classList.contains('accordion__btn--transparent')) {
						accordions.forEach(accordion => {
							accordion.querySelector('.accordion__btn').classList.remove('accordion__btn--transparent');
							accordion.querySelector('.accordion__panel').classList.remove('accordion__panel--active');

						});
						this.classList.add('accordion__btn--transparent');
						accordion.querySelector('.accordion__panel').classList.add('accordion__panel--active');
						if (accordion.querySelector('.hint-text')) {
							accordion.querySelector('.hint-text').classList.remove('hint-text--active');
							accordion.querySelector('.check__hint').classList.add('.check__hint-icon--active');
						}
					} else {
						this.classList.remove('accordion__btn--transparent');
						accordion.querySelector('.accordion__panel').classList.remove('accordion__panel--active');

					}
				})
				//========================================checkbox=======================================
				accordion.querySelectorAll("input[data-radio]").forEach(input => {
					if (input.checked) {
						input.closest('.panel-column__items').querySelector('.check__label').classList.add('check__label--blue');
					}
					input.addEventListener('change', function (e) {
						let fatherAllInput = this.closest('.accordion__container');
						fatherAllInput.querySelector('.accordion__btn-name').textContent = this.value;
						fatherAllInput.querySelector('.price-btn__value').textContent = this.dataset.price;
						accordion.querySelectorAll("input[data-radio]").forEach(input => {
							input.nextElementSibling.classList.remove('check__label--blue');
							input.closest('.panel-column__items').querySelector('.panel__icon').classList.remove('panel__icon--checked')
						})
						this.nextElementSibling.classList.add('check__label--blue');
						this.closest('.panel-column__items').querySelector('.panel__icon').classList.add('panel__icon--checked')
					})
				})
			})
		}
	}
	accordion('.accordion__container');
	//==========================================accordion-input====================================================



	//===============================================acordion-sub-select=============================================

	function subSelect(subSelects) {
		subSelects = document.querySelectorAll(subSelects);
		if (subSelect.length) {
			subSelects.forEach(subSelect => {
				subSelect.addEventListener('click', function (e) {
					this.querySelector('.accordion__panel-sub-panel').classList.toggle('sub-panel-active');
					this.querySelector('.panel__icon-arrow').classList.toggle('panel__icon-arrow-rotate');
				})
			})
		}
	}

	subSelect('.acordion__sub');



	//==============================================hint================================== 

	let hints = document.querySelectorAll('.check__hint');

	if (hints.length) {
		hints.forEach(hint => {
			hint.addEventListener('click', function (e) {
				if (this.closest('.panel-column')) {
					if (this.classList.contains('check__hint-icon--active')) {
						this.closest('.panel-column').querySelector('.hint-text').classList.remove('hint-text--active');
						this.classList.remove('check__hint-icon--active');
					} else {

						this.closest('.panel-column').querySelector('.hint-text').classList.add('hint-text--active');
						this.classList.add('check__hint-icon--active');
					}

				}

			})

		})
	}

	//===============================================================simple-counter====================================
	function inputCounter(inputsCounter) {

		inputsCounter = document.querySelectorAll(inputsCounter);
		if (inputsCounter.length) {
			inputsCounter.forEach(inputCounter => {
				let counter = 0;
				inputCounter.closest('.accordion__container-wrapper').addEventListener('click', function (e) {

					const minus = this.querySelector('.svg-minus');
					const plus = this.querySelector('.svg-plus');
					if (e.target == plus) {
						counter += 1;
						counter = counter <= 0 ? 0 : counter > 15 ? 15 : counter;
						this.querySelector('input').value = counter;
						let amountSlot = this.querySelector('.accordion__panel-amount');
						let nameSlot = this.querySelector('.accordion__panel-title-name');
						if (counter == 15) {
							nameSlot.textContent = 'No slots left'
							amountSlot.textContent = '';
							this.value = counter;
							this.querySelector('.accordion__btn-name span').textContent = counter > 0 ? ` X${counter}` : '';
							this.querySelector('.price-btn__value').innerHTML = ` <span>&#36</span><span price-label class="price-label">${parseFloat((inputCounter.dataset.value.slice(1)) * counter).toFixed(2)}</span>`;
							this.querySelector('input').setAttribute('data-price', `$${parseFloat((inputCounter.dataset.value.slice(1).trim()) * counter).toFixed(2)}`);
							checkAllInput(this.querySelector('input').getAttribute('data-price').slice(1));
							document.querySelector(`[data-accordion-ref=${this.id}]`).querySelector('.list-item__price').innerHTML = this.querySelector('.price-btn__value').innerHTML;
							document.querySelector(`[data-accordion-ref=${this.closest('.accordion__container-wrapper').getAttribute('id')}]`).querySelector('[price-label]').setAttribute('price-label', `${parseFloat((inputCounter.dataset.value.slice(1)) * counter).toFixed(2)}`)
							if (+inputCounter.value > 0) {
								document.querySelector(`[data-accordion-ref="${inputCounter.closest('.accordion__container-wrapper').id}"]`).querySelector('.list-item__price').classList.add('list-item__pricel--blue')
							} else {
								document.querySelector(`[data-accordion-ref="${inputCounter.closest('.accordion__container-wrapper').id}"]`).querySelector('.list-item__price').classList.remove('list-item__pricel--blue')
							}
						} else if (15 > counter >= 0) {
							nameSlot.textContent = 'Free slots'
							amountSlot.textContent = `${15 - counter}`;
							this.value = counter;
							this.querySelector('.accordion__btn-name span').textContent = counter > 0 ? ` X${counter}` : '';
							this.querySelector('.price-btn__value').innerHTML = `<span>&#36</span><span price-label class="price-label">${parseFloat((inputCounter.dataset.value.slice(1)) * counter).toFixed(2)}</span>`;
							this.querySelector('input').setAttribute('data-price', `$${parseFloat((inputCounter.dataset.value.slice(1).trim()) * counter).toFixed(2)}`);
							checkAllInput(this.querySelector('input').getAttribute('data-price').slice(1))
							document.querySelector(`[data-accordion-ref=${this.id}]`).querySelector('.list-item__price').innerHTML = this.querySelector('.price-btn__value').innerHTML;
							document.querySelector(`[data-accordion-ref=${this.closest('.accordion__container-wrapper').getAttribute('id')}]`).querySelector('[price-label]').setAttribute('price-label', `${parseFloat((inputCounter.dataset.value.slice(1)) * counter).toFixed(2)}`)
							if (+inputCounter.value > 0) {
								document.querySelector(`[data-accordion-ref="${inputCounter.closest('.accordion__container-wrapper').id}"]`).querySelector('.list-item__price').classList.add('list-item__pricel--blue')
							} else {
								document.querySelector(`[data-accordion-ref="${inputCounter.closest('.accordion__container-wrapper').id}"]`).querySelector('.list-item__price').classList.remove('list-item__pricel--blue')
							}

						}

					} else if (e.target == minus) {

						counter -= 1;
						counter = counter <= 0 ? 0 : counter > 15 ? 15 : counter;
						this.querySelector('input').value = counter;
						let amountSlot = this.querySelector('.accordion__panel-amount');
						let nameSlot = this.querySelector('.accordion__panel-title-name');
						if (counter == 15) {

							nameSlot.textContent = 'No slots left'
							amountSlot.textContent = '';
							this.value = counter;
							this.querySelector('.accordion__btn-name span').textContent = counter > 0 ? ` X${counter}` : '';
							this.querySelector('.price-btn__value').innerHTML = `<span>&#36</span><span price-label class="price-label">${parseFloat((inputCounter.dataset.value.slice(1)) * counter).toFixed(2)}</span>`;

							this.querySelector('input').setAttribute('data-price', `$${parseFloat((inputCounter.dataset.value.slice(1).trim()) * counter).toFixed(2)}`);
							checkAllInput(this.querySelector('input').getAttribute('data-price').slice(1));
							document.querySelector(`[data-accordion-ref=${this.id}]`).querySelector('.list-item__price').innerHTML = this.querySelector('.price-btn__value').innerHTML;
							document.querySelector(`[data-accordion-ref=${this.closest('.accordion__container-wrapper').getAttribute('id')}]`).querySelector('[price-label]').setAttribute('price-label', `${parseFloat((inputCounter.dataset.value.slice(1)) * counter).toFixed(2)}`)
							if (+inputCounter.value > 0) {
								document.querySelector(`[data-accordion-ref="${inputCounter.closest('.accordion__container-wrapper').id}"]`).querySelector('.list-item__price').classList.add('list-item__pricel--blue')
							} else {
								document.querySelector(`[data-accordion-ref="${inputCounter.closest('.accordion__container-wrapper').id}"]`).querySelector('.list-item__price').classList.remove('list-item__pricel--blue')
							}
						} else if (15 > counter >= 0) {

							nameSlot.textContent = 'Free slots'
							amountSlot.textContent = `${~(counter - 15) + 1}`;
							this.value = counter;
							this.querySelector('.accordion__btn-name span').textContent = counter > 0 ? ` X${counter}` : '';
							this.querySelector('.price-btn__value').innerHTML = `<span>&#36</span><span price-label class="price-label">${parseFloat((inputCounter.dataset.value.slice(1)) * counter).toFixed(2)}</span>`;
							this.querySelector('input').setAttribute('data-price', `$${parseFloat((inputCounter.dataset.value.slice(1).trim()) * counter).toFixed(2)}`);
							checkAllInput(this.querySelector('input').getAttribute('data-price').slice(1))
							document.querySelector(`[data-accordion-ref=${this.id}]`).querySelector('.list-item__price').innerHTML = this.querySelector('.price-btn__value').innerHTML;
							document.querySelector(`[data-accordion-ref=${this.closest('.accordion__container-wrapper').getAttribute('id')}]`).querySelector('[price-label]').setAttribute('price-label', `${parseFloat((inputCounter.dataset.value.slice(1)) * counter).toFixed(2)}`)
							if (+inputCounter.value > 0) {
								document.querySelector(`[data-accordion-ref="${inputCounter.closest('.accordion__container-wrapper').id}"]`).querySelector('.list-item__price').classList.add('list-item__pricel--blue')
							} else {
								document.querySelector(`[data-accordion-ref="${inputCounter.closest('.accordion__container-wrapper').id}"]`).querySelector('.list-item__price').classList.remove('list-item__pricel--blue')
							}
						}
					}
				})
				inputCounter.addEventListener('input', function (e) {
				})
			})
		}
	}

	// inputCounter('[data-counter]')
	inputCounter('[data-counter-simpl]')

	function checkAllInput(counterBonus = 0) {
		let b = parseFloat(counterBonus)
		let c = 0;
		if (document.querySelectorAll('[data-change]').length) {
			document.querySelectorAll('[data-change]').forEach((elem, i) => {

				elem.addEventListener('change', function () {
					let a1 = 0;
					a1 += parseFloat(counterBonus);
					document.querySelectorAll('[data-change]').forEach((elem, i) => {
						if (elem.checked) {
							a1 += parseFloat(elem.dataset.price.slice(1))
							document.querySelectorAll(`[data-accordion-ref='${elem.closest('.accordion__container-wrapper').getAttribute("id")}']`).forEach((accordionRef, i) => {
								accordionRef.querySelector('.list-item__name').textContent = document.querySelectorAll(`#${elem.closest('.accordion__container-wrapper').getAttribute("id")}`)[i].querySelector('.accordion__btn-name').textContent;
								accordionRef.querySelector('.list-item__price').innerHTML = document.querySelectorAll(`#${elem.closest('.accordion__container-wrapper').getAttribute("id")}`)[i].querySelector('.price-btn__value').innerHTML;
								// console.log(typeof accordionRef.querySelector('.list-item__price').innerHTML)
								if (accordionRef.querySelector('.price-label')) {
									accordionRef.querySelector('.price-label').setAttribute('price-label', a1)
								}
								console.log(accordionRef.querySelector('.list-item__price').innerHTML.slice(1))
								if (!isNaN(parseFloat(accordionRef.querySelector('.list-item__price').innerHTML.slice(1)))) {
									if (parseFloat(accordionRef.querySelector('.list-item__price').innerHTML.slice(1)) > 0) {
										accordionRef.querySelector('.list-item__price').classList.add('list-item__pricel--blue')
									} else {
										accordionRef.querySelector('.list-item__price').classList.remove('list-item__pricel--blue')
									}
									// console.log(+(accordionRef.querySelector('.list-item__price').innerHTML.slice(1)))
									console.log(accordionRef)
								}
							})

						}
					})
					c = a1;
					if (document.querySelectorAll('[cart-attr]').length) {
						document.querySelectorAll('[cart-attr]').forEach((attr, i) => {
							function inputDate() {
								let sum = 0;
								// let item = +document.querySelector('.panel__counter-input-simpl').getAttribute('data-price').slice(1);

								let item = 0;
								document.querySelectorAll('.panel__counter-input-simpl').forEach(elem => {
									item += +elem.getAttribute('data-price').slice(1)

								})
								document.querySelectorAll('[data-change]').forEach(e => {
									if (e.checked) {
										sum += +e.getAttribute('data-price').slice(1);
									}
								})
								sum += item;
								attr.textContent = `${attr.getAttribute('cart-attr')} m. - $${+attr.getAttribute('cart-attr') * sum}`
								observer(sum)
							}
							inputDate()
						})
					}
				})
			})
		}
		if (b >= c) {
			if (document.querySelectorAll('[cart-attr]').length) {
				document.querySelectorAll('[cart-attr]').forEach((attr, i) => {
					function inputDate() {
						let sum = 0;
						let item = 0;
						document.querySelectorAll('.panel__counter-input-simpl').forEach(elem => {
							item += +elem.getAttribute('data-price').slice(1)

						})
						document.querySelectorAll('[data-change]').forEach(e => {
							if (e.checked) {
								sum += parseFloat(e.getAttribute('data-price').slice(1));
							}
						})
						sum += item;
						attr.textContent = `${attr.getAttribute('cart-attr')} m. - $${+attr.getAttribute('cart-attr') * sum}`
						observer(sum)
					}
					inputDate()
				})
			}
		}
	}
	checkAllInput()

	inputDate()

	document.querySelectorAll('.select-cart__item').forEach(elem => {
		elem.addEventListener('click', function (e) {
			elem.closest('.cart__select').querySelector('.select-cart__price').setAttribute('price-coeficient', parseFloat(elem.getAttribute('cart-at')))
		})
	})

})

document.querySelectorAll('.select-cart__item').forEach((elem, i) => {
	if (document.querySelectorAll('.select-cart__item').length) {
		elem.addEventListener('click', function (e) {
			this.closest('.cart__select').querySelector('.select-cart__price').setAttribute('price-coeficient', `${this.querySelector('.item-cart__title').getAttribute('cart-attr')}`)
		})
	}
})

function observer(sum = 0) {
	document.querySelector('.page').addEventListener('click', function (e) {
		document.querySelector('.select-cart__price').textContent = `${document.querySelector('[price-coeficient]').getAttribute('price-coeficient')}m. - $${(document.querySelector('[price-coeficient]').getAttribute('price-coeficient') * sum).toFixed(2)}`
		document.querySelector('[cart-prise]').textContent = `$${(document.querySelector('[price-coeficient]').getAttribute('price-coeficient') * sum).toFixed(2)}`
		document.querySelector('[cart-total]').textContent = `$${(document.querySelector('[price-coeficient]').getAttribute('price-coeficient') * sum).toFixed(2)}`
	})
	document.querySelector('.select-cart__price').textContent = `${document.querySelector('[price-coeficient]').getAttribute('price-coeficient')}m. - $${(document.querySelector('[price-coeficient]').getAttribute('price-coeficient') * sum).toFixed(2)}`
	document.querySelector('[cart-prise]').textContent = `$${(document.querySelector('[price-coeficient]').getAttribute('price-coeficient') * sum).toFixed(2)}`
	document.querySelector('[cart-total]').textContent = `$${(document.querySelector('[price-coeficient]').getAttribute('price-coeficient') * sum).toFixed(2)}`
}
document.querySelector('.page').addEventListener('click', function (e) {
	document.querySelectorAll('[price-label]').forEach(elem => {

		if (parseFloat(elem.getAttribute('price-label'))) {
			elem.classList.add('list-item__price--blue');
		} else {
			elem.classList.remove('list-item__price--blue');
		}
	})
})






//===========================================acordion-input-counter============================== 



let counter = 4;
function inputCounterDifficult(inputsCounter) {
	inputsCounter = document.querySelectorAll(inputsCounter);
	if (inputsCounter.length) {
		inputsCounter.forEach(inputCounter => {
			inputCounter.parentElement.addEventListener('click', function (e) {
				let n = 0;
				const minus = this.querySelector('.panel__counter-minus svg');
				const plus = this.querySelector('.panel__counter-plus svg');
				if (e.target == plus) {
					counter = counter - 1;
					counter = counter <= 0 ? 0 : counter > 4 ? 4 : counter;
					if (counter >= 0) {
						if (counter <= 4) {
							if (counter) {
								this.querySelector('input').value = parseInt(this.querySelector('input').value) + 1;

							}

							// if(this.querySelector('input').value>4){
							// 	this.querySelector('input').value = 4;
							// }
						}
					}

					let amount = this.closest('.accordion__panel-column-wrapper').previousElementSibling.querySelector('.accordion__panel-amount');
					switch (counter) {
						case 0:
							amount.textContent = '(Free slots 4)'
							break;
						case 1:
							amount.textContent = '(Free slots 3)'
							break;
						case 2:
							amount.textContent = '(Free slots 2)'
							break;
						case 3:
							amount.textContent = '(Free slots 1)'
							break;
						case 4:
							amount.textContent = '(Free slots 0)'
							break;

					}

				}
				else if (e.target == minus) {
					counter = counter + 1;
					counter = counter <= 0 ? 0 : counter > 4 ? 4 : counter;
					if (counter >= 0) {
						if (counter <= 4) {
							if (counter - 4) {
								this.querySelector('input').value = parseInt(this.querySelector('input').value) - 1;

							}

							// if(this.querySelector('input').value>4){
							// 	this.querySelector('input').value = 4;
							// }
						}
					}
					let amount = this.closest('.accordion__panel-column-wrapper').previousElementSibling.querySelector('.accordion__panel-amount');
					switch (counter) {
						case 0:
							amount.textContent = '(Free slots 4)'
							break;
						case 1:
							amount.textContent = '(Free slots 3)'
							break;
						case 2:
							amount.textContent = '(Free slots 2)'
							break;
						case 3:
							amount.textContent = '(Free slots 1)'
							break;
						case 4:
							amount.textContent = '(Free slots 0)'
							break;

					}
				}

			})
		})
	}
}

inputCounterDifficult("[data-counter]")


// document.querySelector('.cart__btn-reset').addEventListener('click', function(e){
// 	let = scroll = window.scrollY;
// 	console.log(scroll)
// 	window.location.reload();


// })


// 

document.querySelectorAll('[data-accordion-ref]').forEach(link => {

	link.addEventListener('click', function (e) {
		document.querySelectorAll('.accordion__btn').forEach(elem => {
			elem.classList.remove('accordion__btn--transparent')
		})
		document.querySelectorAll('.accordion__panel').forEach(elem => {
			elem.classList.remove('accordion__panel--active')
		})
		if (!document.querySelector(`#${this.getAttribute('data-accordion-ref')}`).classList.contains('warn')) {
			document.querySelector(`#${this.getAttribute('data-accordion-ref')}`).scrollIntoView({ block: "center", behavior: "smooth" });
			document.querySelector(`#${this.getAttribute('data-accordion-ref')}`).querySelector('.accordion__btn').classList.add('accordion__btn--transparent');
			document.querySelector(`#${this.getAttribute('data-accordion-ref')}`).querySelector('.accordion__panel').classList.add('accordion__panel--active');
		}
	})

})

document.querySelector('.page').addEventListener('click', function (e) {
	let arr = [];
	document.querySelectorAll('.price-label').forEach(elem => {
		arr.push(elem.textContent)

	})
	// console.log(arr)
})



document.querySelector('.page').addEventListener('click', function (e) {
	document.querySelectorAll('[data-counter-simpl]').forEach(i => {
		// console.log(i.value)
	})
})