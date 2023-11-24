import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

	public emojiStyle: any = {
		success: '🙂',
		error: '🙁',
		warning: '😐'
	}
	public limit: any = 10;
	public currentPage: any = 1;
	public pages: any = [];
	public pageLimit: any = 5;
    public pageSet: any = {};
    public pageCount: any = -1;
	public pageSetCount: any = 0;

    constructor() { }

	getAlertMessage(status?: any, message?: any, position: any = 'top', showConfirmButton: boolean = false, timer: any = 1000, 
	timerProgressBar: boolean = true, showCloseButton: boolean = true) {
        const Toast = Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: showConfirmButton,
            timer: timer,
            timerProgressBar: timerProgressBar,
            showCloseButton: showCloseButton
        });
        Toast.fire({
            icon: status,
            title: `<div style="display: flex; align-items: center; padding-right: 20px;"> <span>${message}</span> 
			<span style="margin-left: 5px; font-size: 1.5em;">${this.emojiStyle[status]}</span> </div>`
        });
    }

    addClassToPage(page?: any, id?: any) {
		let classObj: any = {
			'active': page == this.currentPage,
			'mr-3': id == 0, 'mr-5': id == 1,
			'mr-2': (page >= 1 && page < this.getPage() && page != '>' && page != '>>'),
			'ml-5': page == '>', 'ml-3': page == '>>',
			'disabled': ((this.currentPage == 1 && (page == '<' || page == '<<'))
				|| (this.currentPage == this.pageSetCount && (page == '>' || page == '>>')))
		}
		return classObj;
	}

    getPage(page?: any) {
		return this.pages[this.pages.indexOf('>') - 1];
	}

	getAllPages(totalCount: any) {
		// this.pages = ['<<','<',1,2,3,'>','>>'];
		this.pages = ['<<','<'];

		this.pageSetCount = (totalCount % Number(this.limit)) == 0 ? (totalCount / Number(this.limit)) : Math.floor(totalCount / Number(this.limit)) + 1;
		// console.log('this.pageSetCount isss:', this.pageSetCount);

		let allPages: any = [];
		for (let i = 1; i <= Number(this.pageSetCount); i += 1) {
			allPages.push(i);
		}
		// console.log('allPages isss:', allPages);

		let chunksData: any = [];
		for (let i = 0; i <= Number(this.pageSetCount); i += Number(this.pageLimit)) {
			let chunk: any = allPages.slice(i, i + Number(this.pageLimit));
			chunksData.push(chunk);
            this.pageSet[i] = chunk;
		}
		// chunksData = _.chunk(allPages, Number(this.pageLimit));
		// console.log('chunksData isss:', chunksData);
        // console.log('pageSet isss:', this.pageSet);

		for (let i = 0; i < chunksData[0].length; i += 1) {
			// this.pages.push(i + 1);
			this.pages.push(chunksData[0][i]);
		}
		this.pages.push('>');
		this.pages.push('>>');
		// console.log('this.pages isss:', this.pages);
		// this.setAllPages(-1);
		return {
			pages: this.pages,
			pageSet: this.pageSet,
			pageSetCount: this.pageSetCount
		}
	}

	setAllPages(page?: any) {
		// console.log('page isss:', page);
		// this.currentPage = page;
        if (['<<', '<', '>', '>>', -1].includes(page)) {
            if (page == '>' || page == -1) {
				this.pageCount += 1;
				this.currentPage = this.pageCount + 1;
				if (this.pageSet.hasOwnProperty(this.pageCount)) {
					this.pages.pop();
					this.pages.pop();
					for (let i = 2; i < this.pages.length; i += 1) {
						this.pages.pop();
					}
					if (this.pageSet[this.pageCount]) {
						let id: any = 2;
						for (const data of this.pageSet[this.pageCount]) {
							this.pages[id] = data;
							id += 1;
						}
						this.pages.push('>');
						this.pages.push('>>');
					}
				} else {
					this.currentPage = this.pageCount + 1;
				}
			} else if (page == '<') {
				this.pageCount -= 1;
				this.currentPage = this.pageCount + 1;
				if (this.pageSet.hasOwnProperty(this.currentPage)) {
					this.pages.pop();
					this.pages.pop();
					for (let i = 2; i < this.pages.length; i += 1) {
						this.pages.pop();
					}
					if (this.pageSet[this.currentPage - Number(this.pageLimit)]) {
						let id: any = 2;
						for (const data of this.pageSet[this.currentPage - Number(this.pageLimit)]) {
							this.pages[id] = data;
							id += 1;
						}
						this.pages.push('>');
						this.pages.push('>>');
					}
				} else {
					this.currentPage = this.pageCount + 1;
				}
			} else if (page == '<<') {
				this.pageCount = 0;
				this.currentPage = 1;
				this.pages.pop();
				this.pages.pop();
				for (let i = 2; i < this.pages.length; i += 1) {
					this.pages.pop();
				}
				let id: any = 2;
				for (const data of this.pageSet[0]) {
					this.pages[id] = data;
					id += 1;
				}
				this.pages.push('>');
				this.pages.push('>>');
			} else if (page == '>>') {
				this.pageCount = this.pageSetCount - 1;
				this.currentPage = this.pageSetCount;
				this.pages.pop();
				this.pages.pop();
				for (let i = 2; i < this.pages.length; i += 1) {
					this.pages.pop();
				}
				let lastPageArr: any = Object.keys(this.pageSet);
				let id: any = 2;
				for (const data of this.pageSet[lastPageArr[lastPageArr.length - 1]]) {
					this.pages[id] = data;
					id += 1;
				}
				this.pages.push('>');
				this.pages.push('>>');
			}
        } else {
            this.currentPage = page;
            this.pageCount = page - 1;
        }
        // console.log('pageCount isss:', this.pageCount);
        // console.log('currentPage isss:', this.currentPage);
		return {
			pageCount: this.pageCount,
			currentPage: this.currentPage
		}
	}
}
