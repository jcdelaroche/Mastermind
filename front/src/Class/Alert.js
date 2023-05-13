export default class Alert {
    
    static success = (message) => {
        this.show(message, 'success');
    }
    static error = (message) => {
        this.show(message, 'error');
    }
    static warning = (message) => {
        this.show(message, 'warning');
    }
    static information = (message) => {
        this.show(message, 'information');
    }

    static show = (message, type) => {
        let title = 'Information';

        switch (type) {
            case 'success':
                title = 'Success';
                break;
            case 'error':
                title = 'Error';
                break;
            case 'warning':
                title = 'Warning';
                break;
            default:
                title = 'Information';
                break;
        }

        const alert = document.createElement('div');
        alert.classList.add('alert');
        alert.dataset.type = type;
                
        
        alert.innerHTML = `
        <div className="alert-header">
            <h5>${title}</h5>
        </div>
        <div className="alert-body">
            <p>${message}</p>
        </div>`
        
        document.querySelector('.alerts-container').appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

}