<template>
    <div>
      <h1>Interactive Data Table</h1>
      <input type="text" v-model="search" placeholder="Search" class="search-input" />
  
      <table class="data-table">
        <thead>
          <tr>
            <th @click="sortTable('first_name')">First Name</th>
            <th @click="sortTable('last_name')">Last Name</th>
            <th @click="sortTable('email')">Email</th>
            <th @click="sortTable('gender')">Gender</th>
            <th @click="sortTable('ip_address')">IP Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedData" :key="user.id">
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.ip_address }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
  
      <button @click="exportToPDF">Export as PDF</button>
    </div>
  </template>
  
  <script>
  import jsPDF from 'jspdf';
  
  export default {
    data() {
      return {
        users: [
        { "id": 1, "first_name": "Tannie", "last_name": "Torbet", "email": "ttorbet0@aol.com", "gender": "Male", "ip_address": "233.132.132.19" },
        { "id": 2, "first_name": "Robin", "last_name": "Patey", "email": "rpatey1@eepurl.com", "gender": "Male", "ip_address": "170.175.106.146" },
        { "id": 3, "first_name": "Kirbee", "last_name": "Elcum", "email": "kelcum2@theguardian.com", "gender": "Female", "ip_address": "211.41.110.134" },
        { "id": 4, "first_name": "Bernita", "last_name": "Landers", "email": "blanders3@phoca.cz", "gender": "Female", "ip_address": "218.44.92.64" },
        { "id": 5, "first_name": "Beltran", "last_name": "Forty", "email": "bforty4@time.com", "gender": "Male", "ip_address": "50.185.103.78" },
        { "id": 6, "first_name": "Emmit", "last_name": "Bees", "email": "ebees5@ehow.com", "gender": "Male", "ip_address": "110.242.184.244" },
        { "id": 7, "first_name": "Lizzy", "last_name": "Ciraldo", "email": "lciraldo6@1688.com", "gender": "Female", "ip_address": "36.135.106.78" },
        { "id": 8, "first_name": "Emilio", "last_name": "Beauvais", "email": "ebeauvais7@springer.com", "gender": "Male", "ip_address": "15.34.220.220" },
        { "id": 9, "first_name": "Locke", "last_name": "Tampen", "email": "ltampen8@alibaba.com", "gender": "Genderqueer", "ip_address": "250.197.206.151" },
        { "id": 10, "first_name": "Thaddeus", "last_name": "Blanket", "email": "tblanket9@hao123.com", "gender": "Male", "ip_address": "177.178.135.16" },
        {"id":11,"first_name":"Vincent","last_name":"Floyd","email":"vfloyda@salon.com","gender":"Male","ip_address":"1.5.98.173"},
        {"id":12,"first_name":"Matthus","last_name":"Noblet","email":"mnobletb@wikimedia.org","gender":"Male","ip_address":"73.230.111.148"},
        {"id":13,"first_name":"Kristen","last_name":"Crummey","email":"kcrummeyc@123-reg.co.uk","gender":"Female","ip_address":"232.36.246.77"},
        {"id":14,"first_name":"Morse","last_name":"Norssister","email":"mnorssisterd@geocities.com","gender":"Male","ip_address":"33.112.61.38"},
        {"id":15,"first_name":"Mohandis","last_name":"Chapier","email":"mchapiere@google.com.br","gender":"Male","ip_address":"178.114.245.219"},
        {"id":16,"first_name":"Melania","last_name":"Loftie","email":"mloftief@netscape.com","gender":"Female","ip_address":"234.142.179.102"},
        {"id":17,"first_name":"Lon","last_name":"Lindholm","email":"llindholmg@jugem.jp","gender":"Male","ip_address":"252.224.66.210"},
        {"id":18,"first_name":"Siward","last_name":"Ghidini","email":"sghidinih@wunderground.com","gender":"Male","ip_address":"25.217.85.42"},
        {"id":19,"first_name":"Rora","last_name":"Vasiljevic","email":"rvasiljevici@mozilla.org","gender":"Genderfluid","ip_address":"153.183.122.77"},
        {"id":20,"first_name":"Loni","last_name":"O'Loughane","email":"loloughanej@google.ca","gender":"Female","ip_address":"3.154.205.99"}
        ],
        search: '',
        currentPage: 1,
        rowsPerPage: 10,
        sortKey: '',
        sortAsc: true
      };
    },
    computed: {
      filteredData() {
        const filter = this.search.toLowerCase();
        return this.users.filter(user =>
          Object.values(user).some(val => String(val).toLowerCase().includes(filter))
        );
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.rowsPerPage;
        const end = start + this.rowsPerPage;
        return this.filteredData.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredData.length / this.rowsPerPage);
      }
    },
    methods: {
      sortTable(key) {
        this.sortAsc = this.sortKey === key ? !this.sortAsc : true;
        this.sortKey = key;
        this.filteredData.sort((a, b) => {
          if (a[key] < b[key]) return this.sortAsc ? -1 : 1;
          if (a[key] > b[key]) return this.sortAsc ? 1 : -1;
          return 0;
        });
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      exportToPDF() {
        const doc = new jsPDF();
        let y = 10;
        doc.text('User Data', 10, y);
        y += 10;
        this.users.forEach(user => {
          doc.text(
            `${user.first_name} ${user.last_name}, Email: ${user.email}, Gender: ${user.gender}, IP: ${user.ip_address}`,
            10,
            y
          );
          y += 10;
        });
        doc.save('users_data.pdf');
      }
    }
  };
  </script>
  
  <style scoped>
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .data-table th, .data-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .data-table th {
    cursor: pointer;
    background-color: #f9f9f9;
  }
  
  .pagination {
    margin-top: 20px;
  }
  
  button {
    margin: 5px;
  }
  </style>
  