using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTO
{
    public class RegisterDTO
    {
        [Required]
        [RegularExpression(@"(^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
       // [RegularExpression(@"[a-zA-Z*$])")]
        public string Name { get; set; }

        [Required]
        public string Mobile { get; set; }
    }
}
