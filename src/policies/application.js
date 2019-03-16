module.exports = class ApplicationPolicy {

    constructor(user, record) {
        this.user = user;
        this.record = record;
    }

    _isOwner() {
        return (this.record.userId === this.user.id);
    }

    _isAdmin() {
        return this.user && this.user.role == 1;
    }

    new() {
        return this._isAdmin() || this.user;
    }

    create() {
        return this.new();
    }

    edit() {
        return this._isAdmin() || this._isOwner();
    }

    update() {
        return this._isOwner() || this._isAdmin();
    }

    destroy() {
        return this._isOwner() || this._isAdmin();
    }
}