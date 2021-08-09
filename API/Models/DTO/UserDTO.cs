﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTO
{
    public class UserDTO
    {
        public int UserID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public bool? IsAdmin { get; set; }
    }
}
