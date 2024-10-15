import './styles/svb-table.scss'
import { lockSvg, filterSvg, sortSvg } from '../icons/icons';
import { createSVG } from '../../assets/createSvg';

export default class SvbTable {
    constructor(data) {
        this.data = data;
        this.element = SvbTable.createElement('table', 'doc-list-table', 'svb-table');
        this.element.appendChild(this.createHeader());
        this.element.appendChild(this.createBody());
        this.selectedRowsId = [];

        this.loadDefaultRows();
        this.setupDeleteButtonListener();
        this.addCreateButtonListener();
    }

    setupDeleteButtonListener() {
        const deleteButton = document.querySelector('.svb-button--red');

        deleteButton.addEventListener('click', () => {
            this.removeRows(this.selectedRowsId);
            this.selectedRowsId = [];
            this.deleteButton.style.display = 'none';
        });
    }

    addCreateButtonListener() {
        const createButton = document.querySelector('.svb-button');

        createButton.addEventListener('click', () => {
            const newRow = this.createRandomRow();

            this.addRow(newRow);
        });
    }

    createHeader() {
        const thead = SvbTable.createElement('thead');
        const headerRow = SvbTable.createElement('tr');

        const firstColumn = SvbTable.createElement('th', null, null, '№');

        firstColumn.style.width = '30px';
        headerRow.appendChild(firstColumn);

        this.data.columns.forEach((col) => {
            if (col !== 'uuid') {
                const th = SvbTable.createElement('th');

                th.style.position = 'relative';
                const headerContainer = document.createElement('div');

                headerContainer.style.display = 'flex';
                headerContainer.style.alignItems = 'center';
                headerContainer.style.justifyContent = 'space-between';
                headerContainer.style.width = '100%';

                const columnName = document.createElement('span');

                columnName.textContent = this.data.settings[col]?.represent || col;
                headerContainer.appendChild(columnName);

                const resizeHandle = SvbTable.createElement('div', null, 'resize-handle');

                resizeHandle.style.position = 'absolute';
                resizeHandle.style.right = '0';
                resizeHandle.style.top = '50%';
                resizeHandle.style.transform = 'translate(50%,-50%)';
                resizeHandle.style.height = '42px';
                resizeHandle.style.width = '8px';
                resizeHandle.style.cursor = 'col-resize';
                resizeHandle.addEventListener('mousedown', e => this.initColumnResize(e, th));


                if (this.data.settings[col]) {
                    th.style.width = `${this.data.settings[col].columnWidth}px`;
                    th.style.textAlign = this.data.settings[col].textAlign || 'left';
                    const svgs = [lockSvg, sortSvg, filterSvg];

                    if (this.data.settings[col].svgs) {
                        const svgContainer = document.createElement('div');

                        svgContainer.style.display = 'flex';
                        svgContainer.style.alignItems = 'center';
                        svgContainer.style.gap = '8px';

                        if (this.data.settings[col].svgs > 1) {
                            svgs.forEach((svg, index) => {
                                const svgElement = createSVG(svg);

                                svgContainer.appendChild(svgElement);
                            })

                        } else {
                            const svgElement = createSVG(svgs[2]);

                            svgContainer.appendChild(svgElement);

                        }

                        headerContainer.appendChild(svgContainer);
                    }

                    th.appendChild(headerContainer);

                    th.appendChild(resizeHandle);
                }

                headerRow.appendChild(th);
            }
        });

        thead.appendChild(headerRow);

        return thead;
    }

    initColumnResize(e, th) {
        e.preventDefault();
        const startX = e.pageX;
        const startWidth = th.offsetWidth;

        const onMouseMove = (event) => {
            const newWidth = startWidth + (event.pageX - startX);

            th.style.width = `${newWidth}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }



    createBody() {
        const tbody = SvbTable.createElement('tbody');

        tbody.classList.add('tbody');

        return tbody;
    }

    loadDefaultRows() {
        if (this.data.rows && Array.isArray(this.data.rows)) {
            this.loadRows(this.data.rows);
        }
    }
    generateDefaultRows(count) {
        return Array.from({ length: count }, () => this.createRandomRow());
    }

    createRandomRow() {
        const uuid = this.generateUUID();

        return {
            uuid,
            docdate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
            attachment: { r: `Приложение №${Math.floor(Math.random() * 100)}` },
            contract: { r: `Договор №${Math.floor(Math.random() * 100)}` },
            project: { r: `Проект №${Math.floor(Math.random() * 100)}` },
            contractor: { r: `TОО Подрядчик ${Math.floor(Math.random() * 10)}` },
            block: `${Math.floor(Math.random() * 10)}КБ${Math.floor(Math.random() * 10)}`,
            jobType: { r: `Работы ${Math.floor(Math.random() * 10)}` },
            sum: `$${(Math.random() * 1000000).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
            sumFact: `$${(Math.random() * 1000000).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
            deadline: `${Math.floor(Math.random() * 30)} д.`
        };
    }


    addRow(row) {
        const tbody = this.element.querySelector('tbody');
        const tr = SvbTable.createElement('tr');

        this.data.rows.push(row);
        const currentRowCount = tbody.rows.length + 1;

        tr.dataset.uuid = row.uuid || row[0];
        tr.dataset.index = currentRowCount;

        const rowData = [
            row.uuid || row[0],
            currentRowCount,
            row.docdate || row[1],
            row.attachment || row[2],
            row.contract || row[3],
            row.project || row[4],
            row.contractor || row[5],
            row.block || row[6],
            row.jobType || row[7],
            row.sum || `$${parseFloat(row[8]).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
            row.sumFact || `$${parseFloat(row[9]).toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
            row.deadline || row[10]
        ];


        rowData.forEach((cell, index) => {
            if (index !== 0) {
                const td = SvbTable.createElement('td');

                td.dataset.name = this.data.columns[index];

                if (index === 2) {
                    const date = new Date(cell);

                    td.textContent = date.toLocaleDateString('ru-RU');
                } else if (typeof cell === 'object' && cell !== null) {
                    td.textContent = cell.r;
                } else if (typeof cell === 'number') {
                    console.log(cell)
                    td.textContent = cell;
                } else {
                    td.textContent = cell;
                }

                tr.appendChild(td);
            }
        });

        tbody.appendChild(tr);
        tr.addEventListener('click', () => this.onRowClick(tr));
    }

    loadRows(newRows) {
        const tbody = this.element.querySelector('tbody');

        tbody.innerHTML = '';

        newRows.forEach((row) => {
            this.addRow(row);
        });
    }

    removeRows(uuids) {
        const tbody = this.element.querySelector('tbody');

        uuids.forEach((uuid) => {
            const rowToRemove = [...tbody.rows].find(row => row.dataset.uuid === uuid);

            if (rowToRemove) {
                tbody.removeChild(rowToRemove);
            }
        });

        Array.from(tbody.rows).forEach((row, index) => {
            row.dataset.index = index + 1;
            const firstCell = row.querySelector('td:first-child');

            firstCell.textContent = index + 1;
        });
    }

    getActiveRow() {
        return this.element.querySelector('tbody tr.active');
    }

    onRowClick(tr) {
        const checkbox = SvbTable.createElement('input');
        const isButtonChecked = this.selectedRowsId.find(id => id === tr.dataset.uuid);

        checkbox.type = 'checkbox';
        checkbox.dataset.uuid = tr.dataset.uuid;
        checkbox.className = 'row-checkbox';
        checkbox.checked = isButtonChecked;

        const rowIndex = tr.dataset.index;
        const deleteButton = document.querySelector('.svb-button--red');
        const firstCell = tr.querySelector('td:first-child');

        if (firstCell.querySelector('.row-checkbox')) {
            firstCell.innerHTML = rowIndex;
            firstCell.style.padding = '12px 8px';
            firstCell.style.textAlign = 'inherit';
            firstCell.style.verticalAlign = 'inherit';
        } else {
            firstCell.innerHTML = '';
            firstCell.appendChild(checkbox);
            firstCell.style.padding = '2px';
            firstCell.style.textAlign = 'center';
            firstCell.style.verticalAlign = 'middle';
            checkbox.style.margin = '0'

            checkbox.addEventListener('click', (event) => {
                event.stopPropagation();


                if (checkbox.checked) {
                    this.addRowIdToSelection(checkbox.dataset.uuid);
                    console.log(this.selectedRowsId.length)
                    deleteButton.style.display = 'block'
                } else {
                    this.removeRowIdFromSelection(checkbox.dataset.uuid);
                    console.log(this.selectedRowsId.length)
                    deleteButton.style.display = this.selectedRowsId.length ? 'block' : 'none';
                }
            });

        }

        this.removeClickOutsideListener();

        this.addClickOutsideListener(tr, firstCell, rowIndex, checkbox, deleteButton);

    }

    addClickOutsideListener(tr, firstCell, rowIndex, checkbox, deleteButton) {
        const handleClickOutside = (event) => {
            if (!tr.contains(event.target)) {
                firstCell.innerHTML = rowIndex;
                firstCell.style.padding = '8px';
                firstCell.style.textAlign = 'inherit';
                firstCell.style.verticalAlign = 'inherit';
                checkbox.checked = false;
                this.removeRowIdFromSelection(checkbox.dataset.uuid);
                deleteButton.style.display = this.selectedRowsId.length ? 'block' : 'none';

                this.removeClickOutsideListener();
            }
        };

        this.currentClickOutsideHandler = handleClickOutside;

        document.addEventListener('click', handleClickOutside);
    }

    removeClickOutsideListener() {
        if (this.currentClickOutsideHandler) {
            document.removeEventListener('click', this.currentClickOutsideHandler);
            this.currentClickOutsideHandler = null;
        }
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        });
    }

    addRowIdToSelection(uuid) {
        if (!this.selectedRowsId.includes(uuid)) {
            this.selectedRowsId.push(uuid);
            console.log(this.selectedRowsId)
        }
    }

    removeRowIdFromSelection(uuid) {
        this.selectedRowsId = this.selectedRowsId.filter(id => id !== uuid);
        console.log(this.selectedRowsId)

    }

    setValue(uuid, cellIndex, value) {
        const row = [...this.element.querySelector('tbody').rows].find(r => r.dataset.uuid === uuid);

        if (row) {
            const cell = row.cells[cellIndex];

            if (cell) {
                cell.textContent = value;
            }
        }
    }

    getValue(uuid, cellIndex) {
        const row = [...this.element.querySelector('tbody').rows].find(r => r.dataset.uuid === uuid);

        if (row) {
            const cell = row.cells[cellIndex];

            if (cell) {
                return cell.textContent;
            }
        }
    }

    /**
     * 
     * @param {string} tagname 
     * @param {string | null} id 
     * @param {string | null} classList 
     * @param {string | null} innerHTML 
     * @returns {HTMLElement}
     */
    static createElement(tagname, id = null, classList = null, innerHTML = null) {
        const element = document.createElement(tagname);

        if (id) element.id = String(id);

        if (classList) {
            const classNames = classList.split(' ');

            classNames.forEach((name) => {
                element.classList.add(name);
            });
        }

        if (innerHTML) element.innerHTML = innerHTML;

        return element;
    }
}